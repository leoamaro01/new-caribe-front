'use client'

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Avatar, Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Faculty} from "@/classes/faculty";
import {createFormData, editFormData} from "@/classes/requests";

export interface CreateFacultyProps {
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  updatingFaculty: Faculty | null;
}

export default function CreateFacultyComponent(props: CreateFacultyProps) {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [mascot, setMascot] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  const [nameError, setNameError] = useState(false);
  const [acronymError, setAcronymError] = useState(false);
  const [mascotError, setMascotError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    setNameError(false);
    setAcronymError(false);
    setMascotError(false);
    setLogoError(false);

    if (!props.updatingFaculty) {
      setName('');
      setAcronym('');
      setMascot('');
      setLogo(null);
    } else {
      setName(props.updatingFaculty.name);
      setAcronym(props.updatingFaculty.acronym);
      setMascot(props.updatingFaculty.mascot);
      setLogo(props.updatingFaculty.logo)
    }
  }, [props.updatingFaculty]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false)

    setNameError(name.trim() === '');
    setAcronymError(acronym.trim() === '');
    setMascotError(mascot.trim() === '');
    setLogoError(logo === null);

    if (name.trim() === '' || acronym.trim() === '' || mascot.trim() === '' || logo === null)
      return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('acronym', acronym);
    formData.append('mascot', mascot);
    formData.append('logo', logo!);

    if (props.updatingFaculty)
      await editFormData("/Faculties", props.updatingFaculty.id,
        formData,
        () => setError(true),
        () => window.location.reload());
    else
      await createFormData("/Faculties", formData,
        () => setError(true),
        () => window.location.reload());
  }

  return <Dialog open={props.show} onClose={props.onClose} sx={{textAlign: 'center'}}>
    <DialogTitle>{props.updatingFaculty ? 'Editar' : 'Crear'} Facultad</DialogTitle>
    <DialogContent>
      <Box component="form"
           noValidate
           autoComplete="off"
           onSubmit={onSubmit}
           sx={{my: 6}}
      >
        <TextField sx={{my: 1, width: 300}}
                   error={nameError}
                   required label="Nombre" value={name}
                   onChange={(e) => setName(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}}
                   error={acronymError}
                   required label="Acrónimo" value={acronym}
                   onChange={(e) => setAcronym(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}}
                   error={mascotError}
                   required label="Mascota" value={mascot}
                   onChange={(e) => setMascot(e.target.value)}/>
        <br/>
        <input
          accept="image/*"
          style={{display: 'none'}}
          id="faculty-logo-file"
          type="file"
          onChange={handleLogoChange}
        />
        <label htmlFor="faculty-logo-file">
          <Button sx={{my: 1, width: 300}} variant="contained" component="span">
            Seleccionar Foto
          </Button>
        </label>
        <br/>
        {logoError && <><Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
            Inserte una foto.
        </Typography><br/></>}
        {logo &&
            <Avatar src={URL.createObjectURL(logo)} alt="Foto Seleccionada"
                    sx={{objectFit: 'contain', width: 300, height: 300}}/>}
        <br/>
        {error && <>
            <Typography sx={{fontStyle: "italic", mt: 2, mb: -2}} color="red" variant="caption">
                Hubo un error al intentar la facultad.
                <br/>
                Por favor inténtelo mas tarde.
            </Typography>
            <br/>
        </>}
      </Box>
      <Button sx={{mt: 3}} type="submit" variant='contained'>
        {props.updatingFaculty ? 'Editar' : 'Crear'}
      </Button>
    </DialogContent>
  </Dialog>;
}