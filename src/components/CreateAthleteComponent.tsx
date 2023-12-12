'use client'

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {createFormData, editFormData, fetchMajors} from "@/classes/requests";
import dayjs, {Dayjs} from "dayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {Athlete} from "@/classes/athlete";

export interface CreateAthleteProps {
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  facultyId: number;
  updatingAthlete: Athlete | null;
}

interface ValueLabel {
  value: number;
  label: string;
}

export default function CreateAthleteComponent(props: CreateAthleteProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [nick, SetNick] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [majorId, setMajorId] = useState(-1);

  const [nameError, setNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [nickError, SetNickError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [majorIdError, setMajorIdError] = useState(false);

  const [error, setError] = useState(false);

  const [majorOptions, setMajorOptions] = useState<ValueLabel[]>([]);

  useEffect(() => {
    setError(false);

    setNameError(false);
    setDateOfBirthError(false);
    SetNickError(false);
    setPhotoError(false);
    setMajorIdError(false);

    if (!props.updatingAthlete) {
      setName('');
      setDateOfBirth(null);
      SetNick('');
      setPhoto(null);
      setMajorId(-1);
    } else {
      setName(props.updatingAthlete.name);
      setDateOfBirth(dayjs(props.updatingAthlete.dateOfBirth, 'DD/MM/YYYY'));
      SetNick(props.updatingAthlete.nick);
      setPhoto(props.updatingAthlete.photo);
      setMajorId(props.updatingAthlete.majorId);
    }
  }, [props.updatingAthlete]);

  useEffect(() => {
    const updateMajors = async () => {
      const majors = await fetchMajors(props.facultyId);
      setMajorOptions(majors.map(m => ({value: m.id, label: m.name})));
    }

    updateMajors().catch(error => console.error('Failed to update majors:', error));
  }, [props.facultyId]);


  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);

    setNameError(name.trim() === '');
    setDateOfBirthError(dateOfBirth === null);
    SetNickError(nick.trim() === '');
    setPhotoError(photo === null);
    setMajorIdError(majorId == -1);

    if (name.trim() === '' || dateOfBirth === null || nick.trim() === '' || photo === null || majorId == -1)
      return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nick', nick);
    formData.append('dateOfBirth', dateOfBirth!.format('DD/MM/YYY'));
    formData.append('photo', photo!);
    formData.append('majorId', majorId.toString());

    if (props.updatingAthlete)
      await editFormData("/Athletes", props.updatingAthlete.id,
        formData,
        () => setError(true),
        () => window.location.reload());
    else
      await createFormData("/Athletes", formData,
        () => setError(true),
        () => window.location.reload());
  }

  return <Dialog maxWidth={false} open={props.show} onClose={props.onClose} sx={{textAlign: 'center'}}>
    <DialogTitle>{props.updatingAthlete ? 'Editar' : 'Crear'} Atleta</DialogTitle>
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
        <TextField sx={{my: 1, width: 300}}
                   error={nameError}
                   required label="Nombre" value={name}
                   onChange={(e) => setName(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}}
                   error={nickError}
                   required label="Nick" value={nick}
                   onChange={(e) => SetNick(e.target.value)}/>
        <br/>
        <DatePicker sx={{my: 1, width: 300}}
                    disableFuture
                    format='DD/MM/YYYY'
                    label="Fecha de Nacimiento"
                    value={dateOfBirth}
                    onChange={(newValue) => setDateOfBirth(newValue)}/>
        <br/>
        {dateOfBirthError && <><Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
            Inserte una fecha de nacimiento.
        </Typography><br/></>}
        <FormControl sx={{my: 1, width: 300}}>
          <InputLabel id="major-select-label">Carrera</InputLabel>
          <Select sx={{textAlign: 'left'}}
                  labelId="major-select-label"
                  value={majorId == -1 ? '' : majorId}
                  error={majorIdError}
                  label="Carrera"
                  onChange={(e) => setMajorId(e.target.value as number)}
          >
            {majorOptions.map(m =>
              <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
          </Select>
        </FormControl>
        <br/>
        <input
          accept="image/*"
          style={{display: 'none'}}
          id="faculty-logo-file"
          type="file"
          onChange={handlePhotoChange}
        />
        <label htmlFor="faculty-logo-file">
          <Button sx={{my: 1, width: 300}} variant="contained" component="span">
            Seleccionar Foto
          </Button>
        </label>
        <br/>
        {photoError && <><Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
            Inserte una foto.
        </Typography><br/></>}
        {photo &&
            <Avatar src={URL.createObjectURL(photo)} alt="Foto Seleccionada"
                    sx={{objectFit: 'contain', width: 300, height: 300}}/>}
        <br/>
        {error && <>
            <Typography sx={{fontStyle: "italic", mt: 2, mb: -2}} color="red" variant="caption">
                Hubo un error al intentar crear el atleta.
                <br/>
                Por favor inténtelo mas tarde.
            </Typography>
            <br/>
        </>}

        <Button sx={{mt: 3}} type="submit" variant='contained'>
          {props.updatingAthlete ? 'Editar' : 'Crear'}
        </Button>
      </Box>
    </DialogContent>
  </Dialog>;
}