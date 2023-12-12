'use client'

import {Event} from "@/classes/event";
import {Faculty} from "@/classes/faculty";
import {useEffect, useState} from "react";
import {fetchEvents, fetchFaculties} from "@/classes/requests";
import NavBar from "@/components/NavBar";
import {Box, Container, Typography} from "@mui/material";
import {EventComponent} from "@/components/EventComponent";

export default function SchedulePage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchFaculties()
      .then(setFaculties)
      .then(() => fetchEvents()
        .then(setEvents));
  }, []);

  return <>
    <NavBar/>
    <Container sx={{mt: 5}}>
      <Typography variant="h2">Eventos</Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        {events.map(e =>
          <EventComponent key={e.id}
                          faculties={faculties}
                          event={e}/>)}
      </Box>
    </Container>
  </>;
}