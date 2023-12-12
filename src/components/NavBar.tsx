'use client'

import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import LoginComponent from "@/components/LoginComponent";
import {useState} from "react";
import {SignUpComponent} from "@/components/SignUpComponent";

export default function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const signedIn = false;

  return <>
    <LoginComponent show={showLogin} onClose={(e) => setShowLogin(false)} onGoToSignUp={(e) => {
      setShowSignUp(true);
      setShowLogin(false);
    }}/>
    <SignUpComponent show={showSignUp} onClose={(e) => setShowSignUp(false)} onGoToLogin={(e) => {
      setShowLogin(true);
      setShowSignUp(false);
    }}/>

    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Juegos Caribe UH
        </Typography>
        <Box sx={{mr: 10}}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/faculties">Facultades</Button>
          <Button color="inherit" href="/schedule">Eventos</Button>
        </Box>
        <Box>
          {signedIn
            ? <Button color="inherit">Cerrar Sesión</Button>
            : <>
              <Button color="inherit" onClick={(e) => setShowLogin(true)}>Inicia Sesión</Button>
              <Button color="inherit" onClick={(e) => setShowSignUp(true)}>Regístrate</Button>
            </>
          }
        </Box>
      </Toolbar>
    </AppBar>
  </>;
}