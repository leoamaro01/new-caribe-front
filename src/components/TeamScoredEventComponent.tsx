'use event'

import {Event} from "@/classes/event";
import {useEffect, useState} from "react";
import Errors from "undici-types/errors";
import {Faculty} from "@/classes/faculty";
import {Score} from "@/classes/score";
import {TeamMember} from "@/classes/team-member";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography} from "@mui/material";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import {ScoreComponent} from "@/components/ScoreComponent";
import InvalidArgumentError = Errors.InvalidArgumentError;

export interface TeamScoredEventProps {
  event: Event;
  faculties: Faculty[];
}

interface EventTeamData {
  teamId: number;
  teamName: string;
  faculty: Faculty;
  score: Score | undefined;
  participants: TeamMember[];
  substitutes: TeamMember[];
}

export function TeamScoredEventComponent(props: TeamScoredEventProps) {
  const [teams, setTeams]
    = useState<EventTeamData[]>([]);
  const [eventSportName, setEventSportName]
    = useState('');
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    if (!props.event || !props.event.teamScores || !props.faculties)
      return;

    setEventSportName(`${props.event.sport.name} - ${props.event.discipline.name}`);

    setTeams(props.event.teamScores.map(s => {
      const faculty = props.faculties.find(f => f.id === s.team.facultyId);
      if (!faculty)
        throw new InvalidArgumentError(`Faculty ${s.team.facultyId} not found rendering events`);

      const data: EventTeamData = {
        teamName: s.team.name,
        teamId: s.team.id,
        faculty: faculty,
        score: s.score,
        participants: s.team.participants,
        substitutes: s.team.substitutes
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
          <br/>
          <ScoreComponent score={team.score}/>
        </Box>)
        .reduce((prev, curr) =>
          <>
            {prev}
            <Typography key={prev.key} variant='overline'>VS</Typography>
            {curr}
          </>)}
    </Box>
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
          <Typography>{team.teamName} [{team.faculty.name}]</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h6'>Participantes</Typography>
                {team.participants.map((p) =>
                  <Typography key={p.id}>{p.athlete.name} [{p.role}]</Typography>)}
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h6'>Suplentes</Typography>
                {team.substitutes.map((p) =>
                  <Typography key={p.id}>{p.athlete.name} [{p.role}]</Typography>)}
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
  </Paper>;
}