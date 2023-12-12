'use event'

import {Event} from "@/classes/event";
import {useEffect, useState} from "react";
import {Faculty} from "@/classes/faculty";
import {Score} from "@/classes/score";
import {TeamMember} from "@/classes/team-member";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography} from "@mui/material";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import {ScoreComponent} from "@/components/ScoreComponent";

export interface ParticipantScoredProps {
  event: Event;
  faculties: Faculty[];
}

interface ParticipantScore {
  participant: TeamMember;
  score: Score | undefined;
}

interface EventTeamData {
  teamId: number;
  teamName: string;
  faculty: Faculty;
  participants: ParticipantScore[];
  substitutes: TeamMember[];
}

export function ParticipantScoredEventComponent(props: ParticipantScoredProps) {
  const [teams, setTeams]
    = useState<EventTeamData[]>([]);
  const [eventSportName, setEventSportName]
    = useState('');
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    if (!props.event || !props.event.participantScoredTeams || !props.faculties)
      return;

    let scores = props.event.participantScores;

    setEventSportName(`${props.event.sport.name} - ${props.event.discipline.name}`);

    setTeams(props.event.participantScoredTeams.map(t => {
      const faculty = props.faculties.find(f => f.id === t.facultyId);
      if (!faculty)
        throw new Error(`Faculty ${t.facultyId} not found rendering events`);

      const data: EventTeamData = {
        teamName: t.name,
        teamId: t.id,
        faculty: faculty,
        participants: t.participants.map(p => {
          const pScore: ParticipantScore = {
            participant: p,
            score: scores?.find(s => s.participantId === p.id)?.score
          };

          return pScore;
        }),
        substitutes: t.substitutes
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
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h6'>Participantes</Typography>
                {team.participants.map((p) =>
                  <Box key={p.participant.id} sx={{display: 'flex', flexDirection: 'row'}}>
                    <Typography>{p.participant.athlete.name} [{p.participant.role}]</Typography>
                    <ScoreComponent score={p.score}/>
                  </Box>)}
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