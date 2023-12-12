'use client'

import {deleteAthlete, fetchFaculties, fetchMajors} from "@/classes/requests";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {AthleteComponent} from "@/components/AthleteComponent";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import NavBar from "@/components/NavBar";
import CreateAthleteComponent from "@/components/CreateAthleteComponent";
import {useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Athlete} from "@/classes/athlete";
import {Faculty} from "@/classes/faculty";
import {Major} from "@/classes/major";


export default function FacultyPage({params}: { params: { name: string } }) {
  const [showCreateAthlete, setShowCreateAthlete] = useState(false);
  const [updatingAthlete, setUpdatingAthlete] = useState<Athlete | null>(null);

  const [faculty, setFaculty] = useState<Faculty | undefined>(undefined);
  const [majors, setMajors] = useState<Major[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculties()
      .then(fs => {
        const fac = fs.find(f => f.acronym.toLowerCase() === params.name.toLowerCase());
        setFaculty(fac);
        if (fac)
          fetchMajors(fac.id)
            .then(setMajors)
            .then(() => setLoading(false));
        else
          setLoading(false);
      });
  }, [params.name]);

  if (!faculty && !loading)
    return <>
      <NavBar/>
      <Container>
        <Typography sx={{mt: 5}} variant="h1" color="text.title">:(</Typography>
        <Typography sx={{mt: 1}} variant="h2" color="text.subtitle">Lo sentimos, no pudimos encontrar esa
          facultad</Typography>
      </Container>
    </>;

  const onEditAthleteHandler = (athlete: Athlete) => {
    setUpdatingAthlete(athlete);
    setShowCreateAthlete(true);
  }

  const onDeleteAthleteHandler = (athlete: Athlete) => {
    deleteAthlete(athlete.id);
    window.location.reload();
  }

  if (loading)
    return <></>;

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <NavBar/>
    <CreateAthleteComponent show={showCreateAthlete}
                            onClose={(e) => setShowCreateAthlete(false)}
                            facultyId={faculty!.id}
                            updatingAthlete={updatingAthlete}/>
    <Container>
      <Button href="/faculties/" sx={{my: 5}}>Atrás</Button>
      <Box sx={{
        display: 'flex',
        mb: 3
      }}>
        <FacultyAvatar faculty={faculty!} width={200} height={200}/>
        <Box sx={{
          ml: 3
        }}>
          <Typography variant="h2">{faculty!.acronym}</Typography>
          <Typography variant="h3">{faculty!.name}</Typography>
        </Box>
      </Box>
      <Typography variant="h2">Atletas</Typography>
      <Button sx={{mb: 2}} onClick={(e) => setShowCreateAthlete(true)}>Añadir Atleta</Button>
      <Grid container spacing={2}>
        {faculty!.athletes.map(a =>
          <AthleteComponent key={a.id}
                            athlete={a}
                            onDeleteAthlete={onDeleteAthleteHandler}
                            onEditAthlete={onEditAthleteHandler} majors={majors}/>)}
      </Grid>
    </Container>
  </LocalizationProvider>;
}