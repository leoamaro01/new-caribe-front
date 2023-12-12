'use client'

import {Faculty} from "@/classes/faculty";
import FacultyComponent from "@/components/FacultyComponent";
import {deleteFaculty, fetchFaculties} from "@/classes/requests"
import {Button, Container, Grid, Typography} from "@mui/material";
import NavBar from "@/components/NavBar";
import CreateFacultyComponent from "@/components/CreateFacultyComponent";
import {useEffect, useState} from "react";

export default function FacultiesPage() {
  const [showCreateFaculty, setShowCreateFaculty] = useState(false);
  const [updatingFaculty, setUpdatingFaculty] = useState<Faculty | null>(null);

  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    fetchFaculties()
      .then(setFaculties);
  }, []);

  const onEditFacultyHandler = (faculty: Faculty) => {
    setUpdatingFaculty(faculty);
    setShowCreateFaculty(true);
  }

  const onDeleteFacultyHandler = (faculty: Faculty) => {
    deleteFaculty(faculty.id);
    window.location.reload();
  }

  return <>
    <NavBar/>
    <CreateFacultyComponent show={showCreateFaculty}
                            onClose={(e) => {
                              setShowCreateFaculty(false);
                              setUpdatingFaculty(null);
                            }}
                            updatingFaculty={updatingFaculty}/>
    <Container sx={{mt: 5}}>
      <Typography variant="h2">Facultades</Typography>
      <Button sx={{mb: 2}}
              onClick={(e) => setShowCreateFaculty(true)}>
        Añadir Facultad
      </Button>
      <Grid container spacing={2}>
        {faculties.map(f =>
          <FacultyComponent key={f.id}
                            faculty={f}
                            onEditFaculty={onEditFacultyHandler}
                            onDeleteFaculty={onDeleteFacultyHandler}/>)}
      </Grid>
    </Container></>;
} 