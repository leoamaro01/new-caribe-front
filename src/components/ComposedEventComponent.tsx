'use event'

import {Event} from "@/classes/event";
import {useEffect, useState} from "react";
import Errors from "undici-types/errors";
import {Faculty} from "@/classes/faculty";
import {Score} from "@/classes/score";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography} from "@mui/material";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import {ScoreComponent} from "@/components/ScoreComponent";
import {Composition} from "@/classes/composition";
import InvalidArgumentError = Errors.InvalidArgumentError;

export interface ComposedEventProps {
  event: Event;
  faculties: Faculty[];
}

interface CompositionScore {
  composition: Composition;
  score: Score | undefined;
}

interface EventTeamData {
  teamId: number;
  teamName: string;
  faculty: Faculty;
  compositions: CompositionScore[];
}

export function ComposedEventComponent(props: ComposedEventProps) {
  const [teams, setTeams]
    = useState<EventTeamData[]>([]);
  const [eventSportName, setEventSportName]
    = useState('');
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    if (!props.event || !props.event.composedTeams || !props.faculties)
      return;

    let scores = props.event.compositionScores;

    setEventSportName(`${props.event.sport.name} - ${props.event.discipline.name}`);

    setTeams(props.event.composedTeams.map(t => {
      const faculty = props.faculties.find(f => f.id === t.facultyId);
      if (!faculty)
        throw new InvalidArgumentError(`Faculty ${t.facultyId} not found rendering events`);

      const data: EventTeamData = {
        teamName: t.name,
        teamId: t.id,
        faculty: faculty,
        compositions: t.compositions.map(c => {
          const cScore: CompositionScore = {
            composition: c,
            score: scores?.find(s => s.compositionId === c.id)?.score
          };
          return cScore;
        })
      };

      return data;
    }));
  }, [props.event, props.faculties]);

  return <Paper sx={{textAlign: 'center'}}>
    <Typography sx={{mt: 1}} variant='caption'>{eventSportName}</Typography>
    <Box sx={{display: 'flex', my: 2, alignItems: 'center'}}>
      {teams.map((team) =>
        <Box key={team.teamId} sx={{textAlign: 'center'}}>
          <FacultyAvatar faculty={team.faculty} width={200} height={200}/>
          <br/>
          <Typography variant='overline'>{team.teamName}</Typography>
        </Box>)
        .reduce((prev, curr) =>
          <>
            {prev}
            <Typography key={prev.key} variant='overline'>VS</Typography>
            {curr}
          </>)}
    </Box>
    <Typography variant='h6'>Composiciones</Typography>
    {teams.map((team) => (
      <Accordion key={team.teamId}
                 expanded={expanded === team.teamId}
                 onChange={(e) => {
                   if (expanded === team.teamId)
                     setExpanded(-1);
                   else
                     setExpanded(team.teamId);
                 }}>
        <AccordionSummary>
          <Typography>{team.teamName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            {team.compositions.map((c) =>
              <Box key={c.composition.id} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  {c.composition.participants.map((participant) => (
                    <Typography key={participant.id}>{participant.athlete.name} [{participant.role}]</Typography>
                  ))}
                </Box>
                <ScoreComponent score={c.score}/>
              </Box>)}
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
  </Paper>;
}