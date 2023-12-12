import React, {FormEvent, MouseEventHandler, useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, Link, TextField, Typography} from "@mui/material";
import {SignUp} from "@/classes/requests";
import {authTokenStorageKey} from "@/classes/constants";

export interface SignUpProps {
  onGoToLogin: MouseEventHandler<HTMLAnchorElement>;
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export function SignUpComponent(props: SignUpProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    await SignUp(formData, () => setError(true), (token: string) => {
      localStorage.setItem(authTokenStorageKey, token);
      window.location.reload();
    });
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
        <TextField sx={{my: 1, width: 300}} required label="Nombre de Usuario" value={username} type='email'
                   onChange={(e) => setUsername(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}} required label="Contraseña" value={password} type='password'
                   onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        {error && <>
            <Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
                Hubo un error al crear tu cuenta.</Typography>
            <br/>
        </>}
        <Button sx={{mt: 3}} variant='contained' type='submit'>Crear Cuenta</Button>
      </Box>
      <Typography sx={{fontStyle: 'italic'}} variant='caption'>
        ¿Ya te registraste?{' '} <Link onClick={props.onGoToLogin} underline='hover'>Inicia sesión.</Link>
      </Typography>
    </DialogContent>
  </Dialog>;
}