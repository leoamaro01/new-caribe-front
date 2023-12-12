'use client'

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl, FormControlLabel,
  InputLabel,
  MenuItem,
  Select, Switch,
  TextField,
  Typography
} from "@mui/material";
import {createFormData, editFormData, fetchMajors, fetchTeams} from "@/classes/requests";
import dayjs, {Dayjs} from "dayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {EventType, Event} from "@/classes/event";
import {Score} from "@/classes/score";
import {NormalTeam} from "@/classes/normal-team";

export interface CreateEventProps {
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  updatingEvent: Event| null;
  teams: NormalTeam[];
}

interface ValueLabel {
  value: number;
  label: string;
}

interface IdScore {
  id: number;
  score?: Score;
}

interface MatchScore {
  participantScores: IdScore[];
}

export default function CreateAthleteComponent(props: CreateEventProps) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState(''); 
  const [sport, setSport] = useState('');
  const [sportDiscipline, setSportDiscipline] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.TeamScored);

  const [composedTeamIds, setComposedTeamIds] = useState<number[]>([]);
  const [compositionScores, setCompositionScores] = useState<IdScore[]>([]);
  
  const [eventTeamIds, setEventTeamIds] = useState<number[]>([]);
   
  const [teamScores, setTeamScores] = useState<IdScore[]>([]); 
  const [individualScores, setIndividualScores] = useState<IdScore[]>([]);
  const [matches, setMatches] = useState<MatchScore[]>([]);
  
  const [dateError, setDateError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [sportError, setSportError] = useState(false);
  const [sportDisciplineError, setSportDisciplineError] = useState(false);
  const [composedTeamIdsError, setComposedTeamIdsError] = useState(false);
  const [compositionScoresError, setCompositionScoresError] = useState(false);
  const [eventTeamIdsError, setEventTeamIdsError] = useState(false);
  const [teamScoresError, setTeamScoresError] = useState(false);
  const [individualScoresError, setIndividualScoresError] = useState(false);
  const [matchesError, setMatchesError] = useState(false);
  
  const [error, setError] = useState(false);
  
  const [refresh, setRefresh] = useState(false);

  const [teamOptions, setTeamOptions] = useState<ValueLabel[]>([]);
  
  const [eventHappened, setEventHappened] = useState(false);
  
  useEffect(() => {
    setError(false);
    
    setDateError(false);
    setLocationError(false);
    setSportError(false);
    setSportDisciplineError(false);
    setComposedTeamIdsError(false);
    setCompositionScoresError(false);
    setEventTeamIdsError(false);
    setTeamScoresError(false);
    setIndividualScoresError(false);
    setMatchesError(false);

    if (!props.updatingEvent) {
      setDate(null);
      setLocation('');
      setSport(''); 
      setSportDiscipline('');
      setEventType(EventType.TeamScored);
      setComposedTeamIds([]);
      setCompositionScores([]);
      setEventTeamIds([]);
      setTeamScores([]);
      setIndividualScores([]);
      setMatches([]);
    } 
    else {
      setDate(dayjs(props.updatingEvent.dateTime, 'DD/MM/YYYY'));
      setLocation(props.updatingEvent.location.name);
      setSport(props.updatingEvent.sport.name);
      setSportDiscipline(props.updatingEvent.discipline.name);
      setEventType(props.updatingEvent.type);
      setComposedTeamIds([]);
      setCompositionScores([]);
      setEventTeamIds([]);
      setTeamScores([]);
      setIndividualScores([]);
      setMatches([]);
    }
  }, [props.updatingEvent]);

  useEffect(() => {
    const updateTeams = async () => {
      const teams = await fetchTeams();
      setTeamOptions(teams.map(t => ({value: t.id, label: t.name})));
    }

    updateTeams().catch(error => console.error('Failed to update teams:', error));
  }, [refresh]);
  

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);

    

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
  
  let eventDialogContent = <></>;
  
  switch (eventType) {
    case EventType.Composed:
      eventDialogContent = <>
        
      </>
      break;
    case EventType.ParticipantScored:
      break;
    case EventType.TeamScored:
      eventDialogContent = <>
        <FormControl sx={{my: 1, width: 300}}>
          <InputLabel id="teams-select-label">Equipos</InputLabel>
          <Select sx={{textAlign: 'left'}}
                  multiple
                  labelId="teams-select-label"
                  value={eventTeamIds}
                  label="Equipos"
                  onChange={(e) => 
                    setEventTeamIds(e.target.value as number[])}
          >
            {teamOptions.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
          </Select>
        </FormControl>
        {eventTeamIds.map((eventTeamId) => (
          <Box>
            
          </Box>
        ))}
      </>
      break;
    case EventType.MatchEvent:
      break;
  }
  
  return <Dialog maxWidth={false} open={props.show} onClose={props.onClose} sx={{textAlign: 'center'}}> 
    <DialogTitle>{props.updatingEvent ? 'Editar' : 'Crear'} Evento</DialogTitle>
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
        <FormControlLabel control={
          <Switch defaultChecked value={eventHappened} 
                  onClick={(e) => setEventHappened(!eventHappened)}/>
        } label="¿Ya Ocurrió?" />
        <DatePicker sx={{my: 1, width: 300}}
                    format='DD/MM/YYYY' 
                    label="Fecha"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}/>
        <br/>
        {dateError && <><Typography sx={{fontStyle: "italic", mt: -1, mb: 1}} color="red" variant="caption">
            Inserte una Fecha.
        </Typography><br/></>}
        <TextField sx={{my: 1, width: 300}}
                   error={locationError}
                   required label="Lugar" value={location}
                   onChange={(e) => setLocation(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}}
                   error={sportError}
                   required label="Deporte" value={sport}
                   onChange={(e) => setSport(e.target.value)}/>
        <br/>
        <TextField sx={{my: 1, width: 300}}
                   error={sportDisciplineError}
                   required label="Disciplina" value={sportDiscipline} 
                   onChange={(e) => setSportDiscipline(e.target.value)}/>
        <br/>        
        <FormControl sx={{my: 1, width: 300}}>
          <InputLabel id="event-type-select-label">Tipo</InputLabel>
          <Select sx={{textAlign: 'left'}}
                  labelId="event-type-select-label"
                  value={eventType}
                  label="Tipo"
                  onChange={(e) => setEventType(e.target.value as EventType)}
          >
            <MenuItem value={EventType.TeamScored}>Puntuado Por Equipos</MenuItem>
            <MenuItem value={EventType.ParticipantScored}>Puntuado Por Participante</MenuItem>
            <MenuItem value={EventType.MatchEvent}>Por Encuentros</MenuItem>
            <MenuItem value={EventType.Composed}>Por Composiciones</MenuItem>
          </Select>
        </FormControl>
        <br/>
        {eventDialogContent}
        {error && <>
            <Typography sx={{fontStyle: "italic", mt: 2, mb: -2}} color="red" variant="caption">
                Hubo un error al intentar crear el evento.
                <br/>
                Por favor inténtelo mas tarde.
            </Typography> 
            <br/>
        </>}
        <Button sx={{mt: 3}} type="submit" variant='contained'>
          {props.updatingEvent ? 'Editar' : 'Crear'}
        </Button>
      </Box>
    </DialogContent>
  </Dialog>;