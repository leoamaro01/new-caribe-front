'use client'

import {Box, Button, Dialog, DialogContent, DialogTitle, Link, TextField, Typography} from "@mui/material";
import React, {FormEvent, MouseEventHandler, useState} from "react";
import {SignIn} from "@/classes/requests";
import {authTokenStorageKey} from "@/classes/constants";

export interface LoginProps {
  onGoToSignUp: MouseEventHandler<HTMLAnchorElement>;
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export default function LoginComponent(props: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    await SignIn(formData,
      () => setError(true),
      (token: string) => {
        localStorage.setItem(authTokenStorageKey, token);
        window.location.reload();
      });
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
        <TextField sx={{my: 1, width: 300}} required label="Nombre de Usuario" value={username} type='text'
                   onChange={(e) => setUsername(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}} required label="Contraseña" value={password} type='password'
                   onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        {error && <>
            <Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
                Hubo un error al iniciar sesión.</Typography>
            <br/>
        </>}
        <Button sx={{mt: 3}} variant='contained' type='submit'>Iniciar Sesión</Button>
      </Box>
      <Typography sx={{fontStyle: 'italic'}} variant='caption'>
        ¿No te has registrado aún?{' '} <Link onClick={props.onGoToSignUp} underline='hover'>Crea una cuenta
        nueva.</Link>
      </Typography>
    </DialogContent>
  </Dialog>;
}