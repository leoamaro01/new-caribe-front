'use client'

import {FormEvent, useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

export default function CreateFacultyPage() {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [mascot, setMascot] = useState('');
  const [logo, setLogo] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify({name, acronym, mascot, logo}));
  }

  return <Container>
    <Typography variant="h4">Crear una Facultad</Typography>
    <Box
      sx={{
        mt: 2,
        width: 800,
      }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField sx={{mb: 1}}
                 required fullWidth label="Nombre" value={name}
                 onChange={(e) => setName(e.target.value)}/>
      <Box
        sx={{
          display: 'flex',
          mt: 1,
          flexDirection: 'row',
        }}>
        <TextField sx={{mr: 1, flexGrow: 1}} required label="Acrónimo" value={acronym}
                   onChange={(e) => setAcronym(e.target.value)}/>
        <TextField sx={{ml: 1, mr: 1, flexGrow: 1}} required label="Mascota" value={mascot}
                   onChange={(e) => setMascot(e.target.value)}/>
        <TextField sx={{ml: 1, flexGrow: 1}} required label="Logotipo" value={logo}
                   onChange={(e) => setLogo(e.target.value)}/>
      </Box>
      <br/>
      <Button type="submit" variant='outlined'>Submit</Button>
    </Box>
  </Container>;
}