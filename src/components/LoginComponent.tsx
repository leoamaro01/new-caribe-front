'use client'

import {Box, Button, Dialog, DialogContent, DialogTitle, Link, TextField, Typography} from "@mui/material";
import React, {FormEvent, MouseEventHandler, useState} from "react";

export interface LoginProps {
  onGoToSignUp: MouseEventHandler<HTMLAnchorElement>;
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export default function LoginComponent(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // todo: login methods
  }

  return <Dialog open={props.show} maxWidth={false} onClose={props.onClose} sx={{
    textAlign: 'center',
  }}>
    <DialogTitle>
      ¡Bienvenido de vuelta!
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
        ¿No te has registrado aún?{' '} <Link onClick={props.onGoToSignUp} underline='hover'>Crea una cuenta
        nueva.</Link>
      </Typography>
    </DialogContent>
  </Dialog>;
}