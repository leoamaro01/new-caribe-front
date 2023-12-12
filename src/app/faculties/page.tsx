'use client'

import {Faculty} from "@/classes/faculty";
import FacultyComponent from "@/components/FacultyComponent";
import {deleteFaculty, fetchFaculties, HasPrivileges} from "@/classes/requests"
import {Button, Container, Grid, Typography} from "@mui/material";
import NavBar from "@/components/NavBar";
import CreateFacultyComponent from "@/components/CreateFacultyComponent";
import {useEffect, useState} from "react";
import {YesNoDialogComponent} from "@/components/YesNoDialogComponent";

export default function FacultiesPage() {
  const [showCreateFaculty, setShowCreateFaculty] = useState(false);
  const [updatingFaculty, setUpdatingFaculty] = useState<Faculty | null>(null);

  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const [hasPrivileges, setHasPrivileges] = useState(false);

  const [deletingFacultyId, setDeletingFacultyId] = useState(-1);
  const [showDeleteFaculty, setShowDeleteFaculty] = useState(false);

  useEffect(() => {
    HasPrivileges()
      .then(setHasPrivileges);
  }, []);

  useEffect(() => {
    fetchFaculties()
      .then(setFaculties);
  }, []);

  const onEditFacultyHandler = (faculty: Faculty) => {
    setUpdatingFaculty(faculty);
    setShowCreateFaculty(true);
  }

  const onDeleteFacultyHandler = (faculty: Faculty) => {
    setDeletingFacultyId(faculty.id);
    setShowDeleteFaculty(true);
  }

  const confirmDeleteFaculty = () => {
    deleteFaculty(deletingFacultyId)
      .then(() => window.location.reload());
  };

  return <>
    <NavBar/>
    <YesNoDialogComponent show={showDeleteFaculty} onClose={(e) => setShowDeleteFaculty(false)}
                          title={"Confirmación de eliminación"}
                          message={"¿Estás seguro de que deseas eliminar esa facultad?"}
                          onYes={confirmDeleteFaculty} onNo={() => setShowDeleteFaculty(false)}/>
    <CreateFacultyComponent show={showCreateFaculty}
                            onClose={(e) => {
                              setShowCreateFaculty(false);
                              setUpdatingFaculty(null);
                            }}
                            updatingFaculty={updatingFaculty}/>
    <Container sx={{mt: 5}}>
      <Typography variant="h2">Facultades</Typography>
      {hasPrivileges && <Button sx={{mb: 2}}
                                onClick={(e) => setShowCreateFaculty(true)}>
          Añadir Facultad
      </Button>}
      <Grid container spacing={2}>
        {faculties.map(f =>
          <FacultyComponent key={f.id}
                            faculty={f}
                            hasPrivileges={hasPrivileges}
                            onEditFaculty={onEditFacultyHandler}
                            onDeleteFaculty={onDeleteFacultyHandler}/>)}
      </Grid>
    </Container></>;
} 