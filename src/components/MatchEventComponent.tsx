'use event'

import {Event} from "@/classes/event";
import {useEffect, useState} from "react";
import Errors from "undici-types/errors";
import {Faculty} from "@/classes/faculty";
import {Score} from "@/classes/score";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography} from "@mui/material";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import {TeamMember} from "@/classes/team-member";
import {ScoreComponent} from "@/components/ScoreComponent";
import InvalidArgumentError = Errors.InvalidArgumentError;

export interface MatchEventProps {
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
  substitutes: TeamMember[];
}

interface MatchData {
  matchId: number;
  matchedParticipants: ParticipantScore[];
}

export function MatchEventComponent(props: MatchEventProps) {
  const [teams, setTeams]
    = useState<EventTeamData[]>([]);
  const [matches, setMatches] = useState<MatchData[]>([])

  const [eventSportName, setEventSportName]
    = useState('');
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    if (!props.event || !props.event.matchEventTeams || !props.faculties)
      return;

    let matches = props.event.matches;

    setEventSportName(`${props.event.sport.name} - ${props.event.discipline.name}`);

    setTeams(props.event.matchEventTeams.map(t => {
      const faculty = props.faculties.find(f => f.id === t.facultyId);
      if (!faculty)
        throw new InvalidArgumentError(`Faculty ${t.facultyId} not found rendering events`);

      const data: EventTeamData = {
        teamName: t.name,
        teamId: t.id,
        faculty: faculty,
        substitutes: t.substitutes
      };

      return data;
    }));

    if (!props.event.matches)
      setMatches([]);
    else
      setMatches(props.event.matches.map(m => {
        const matchData: MatchData = {
          matchId: m.id,
          matchedParticipants: m.teamParticipantScore.map(s => {
            const pScore: ParticipantScore = {
              participant: props.event.matchEventTeams!
                .flatMap(t => t.participants)
                .find(p => p.id == s.participantId)!,
              score: s.score
            };

            return pScore;
          })
        };

        return matchData;
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
    {
      matches.length > 0 &&
        <Accordion>
            <AccordionSummary>
                <Typography>Encuentros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                      display: 'flex', flexDirection: 'column',
                      justifyContent: 'space-evenly', alignItems: 'center'
                    }}>
                  {matches.flatMap(m =>
                    m.matchedParticipants.map(p =>
                      <Box key={p.participant.id} sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography>{p.participant.athlete.name} [{p.participant.role}]</Typography>
                        <ScoreComponent score={p.score}/>
                      </Box>).reduce((prev, curr) =>
                      <>{prev}<Typography key={prev.key} variant='overline'>VS</Typography>{curr}</>))}
                </Box>
            </AccordionDetails>
        </Accordion>
    }
    <Typography variant='h6'>Suplentes</Typography>
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
            {team.substitutes.map((p) =>
              <Typography key={p.id}>{p.athlete.name} [{p.role}]</Typography>)}
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
  </Paper>;
}