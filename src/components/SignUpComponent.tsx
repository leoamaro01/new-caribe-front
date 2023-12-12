import React, {FormEvent, MouseEventHandler, useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, Link, TextField, Typography} from "@mui/material";

export interface SignUpProps {
  onGoToLogin: MouseEventHandler<HTMLAnchorElement>;
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export function SignUpComponent(props: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // todo: login methods
  }

  return <Dialog maxWidth={false} open={props.show} onClose={props.onClose} sx={{
    textAlign: 'center'
  }}>
    <DialogTitle>
      ¡Bienvenido a Juegos Caribe UH!
    </DialogTitle>
    <DialogContent>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{
          my: 6
        }}
      >
        <TextField sx={{my: 1, width: 300}} required label="Correo" value={email} type='email'
                   onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}} required label="Contraseña" value={password} type='password'
                   onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <Button sx={{mt: 3}} variant='contained' type='submit'>Iniciar Sesión</Button>
      </Box>
      <Typography sx={{fontStyle: 'italic'}} variant='caption'>
        ¿Ya te registraste?{' '} <Link onClick={props.onGoToLogin} underline='hover'>Inicia sesión.</Link>
      </Typography>
    </DialogContent>
  </Dialog>;
}