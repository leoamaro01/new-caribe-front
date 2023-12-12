import NavBar from "@/components/NavBar";
import {Container, Typography} from "@mui/material";

export default function Home() {
  return <>
    <NavBar/>
    <Container>
      <Typography sx={{mt: 5}} variant="h1" color="text.title">
        Bienvenido a la página de los Juegos Caribe de la Universidad de la Habana!
      </Typography>
    </Container>
  </>;
}