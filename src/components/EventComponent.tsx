import {Event} from "@/classes/event";
import {Faculty} from "@/classes/faculty";
import {FacultyImage} from "@/components/FacultyComponent";
import {JSX} from "react";
import {MapLocationComponent} from "@/components/MapLocationComponent";
import {ScoreComponent} from "@/components/ScoreComponent";

export function EventComponent(e: Event, faculties: Faculty[]) {
  let eventContent;
  let facultyVs: JSX.Element[];
  switch (e.type) {
    case "TeamScored":
      if (!e.teamScores)
        throw new Error("No teams specified on TeamScored Event");

      facultyVs = [];

      for (let s of e.teamScores) {
        const teamFaculty = faculties.find(f => f.id == s.team.facultyId);
        if (!teamFaculty)
          throw new Error(`Faculty ${s.team.facultyId} not found rendering events`);

        facultyVs.push(<div key={teamFaculty.id}>
          <p>{teamFaculty.acronym}</p>
          {FacultyImage(teamFaculty, "rounded-3xl flex-shrink-0", 125, 125)}
          {ScoreComponent(s.score)}
        </div>);
        facultyVs.push(<p>VS</p>)
      }

      facultyVs.pop();
      eventContent = (<div className="flex">
        {facultyVs}
      </div>)
      break;
    case "ParticipantScored":
      if (!e.participantScoredTeams)
        throw new Error("No teams specified on ParticipantScored Event");

      facultyVs = [];

      for (let s of e.participantScoredTeams) {
        const teamFaculty = faculties.find(f => f.id == s.facultyId);

        if (!teamFaculty)
          throw new Error(`Faculty ${s.facultyId} not found rendering events`);

        facultyVs.push(<div key={teamFaculty.id}>
          <p>{teamFaculty.acronym}</p>
          {FacultyImage(teamFaculty, "rounded-3xl flex-shrink-0", 125, 125)}
        </div>);
        facultyVs.push(<p>VS</p>)
      }

      facultyVs.pop();

      eventContent = <div>
        {facultyVs}
        {e.participantScoredTeams.map((team) => {
            if (!e.participantScores)
              return <></>;

            let faculty = faculties.find(f => f.id == team.facultyId);
            if (!faculty)
              throw new Error(`Faculty ${team.facultyId} not found rendering events`);

            let participantIds = team.participants.map((participant) => participant.id);
            let participantScores = e.participantScores.filter(s => s.participantId in participantIds);

            return <div key={team.id}>
              <p>[{faculty.acronym}] :</p>
              <p>Participants:</p>
              <ul>
                {participantScores.map(p => {
                  let participant = team.participants.find(m => m.id == p.participantId);

                  if (!participant)
                    throw new Error("Participant not found");

                  return <li key={p.participantId}>{participant.athlete.name} [{participant.role}]
                    -&gt; {ScoreComponent(p.score)}</li>
                })}
              </ul>
              <p>Substitutes:</p>
              <ul>
                {team.substitutes.map(p => {
                  return <li key={p.id}>{p.athlete.name} [{p.role}]</li>
                })}
              </ul>
            </div>;
          }
        )}
      </div>
      break;
    case "MatchEvent":
      if (!e.matchEventTeams)
        throw new Error("No teams specified on MatchEvent")

      facultyVs = [];

      for (let t of e.matchEventTeams) {
        const teamFaculty = faculties.find(f => f.id == t.facultyId);
        if (!teamFaculty)
          throw new Error(`Faculty ${t.facultyId} not found rendering events`);

        facultyVs.push(<div key={teamFaculty.id}>
          <p>{teamFaculty.acronym}</p>
          {FacultyImage(teamFaculty, "rounded-3xl flex-shrink-0", 125, 125)}
        </div>);
        facultyVs.push(<p>VS</p>);
      }

      facultyVs.pop();

      let matchElements: JSX.Element[] = [];

      if (e.matches) {
        matchElements = e.matches.map(m => {
          if (m.teamParticipantScore.length < 2)
            throw new Error("Not enough participants specified in match");

          let participants = e.matchEventTeams!.flatMap(t => t.participants);

          let participantOne = participants.find(p => p.id == m.teamParticipantScore[0].participantId);
          if (!participantOne)
            throw new Error("Participant not found");

          let participantTwo = participants.find(p => p.id == m.teamParticipantScore[1].participantId);
          if (!participantTwo)
            throw new Error("Participant not found");

          return <div key={m.id} className="flex">
            <p>{participantOne.athlete.name}</p>
            <p>{ScoreComponent(m.teamParticipantScore[0].score)} VS {ScoreComponent(m.teamParticipantScore[1].score)}</p>
            <p>{participantTwo.athlete.name}</p>
          </div>;
        });
      }

      eventContent = <div>
        {facultyVs}
        {matchElements}
      </div>
      break;
    case "Composed":
      if (!e.composedTeams)
        throw new Error("No teams specified on Composed Event");

      facultyVs = [];

      for (let t of e.composedTeams) {
        const teamFaculty = faculties.find(f => f.id == t.facultyId);
        if (!teamFaculty)
          throw new Error(`Faculty ${t.facultyId} not found rendering events`);

        facultyVs.push(<div key={teamFaculty.id}>
          <p>{teamFaculty.acronym}</p>
          {FacultyImage(teamFaculty, "rounded-3xl flex-shrink-0", 125, 125)}
        </div>);
        facultyVs.push(<p>VS</p>);
      }

      facultyVs.pop();

      let compositionScore;
      if (e.compositionScores) {
        compositionScore = <div>
          <p>Score</p>
          {e.composedTeams.map(t => {
            let faculty = faculties.find(f => f.id == t.facultyId);
            if (!faculty)
              throw new Error("Faculty not found");

            let teamCompositions = t.compositions;
            let teamCompScores = e.compositionScores!.filter(s => s.compositionId in teamCompositions.map(c => c.id));

            return <div key={t.id}>
              <p>{faculty.acronym}:</p>
              {teamCompScores.map(s => {
                let comp = teamCompositions.find(c => c.id == s.compositionId)!;
                return <div key={s.compositionId}>
                  <p>{comp.participants.map(m => m.athlete.nick).join(", ")}</p>
                  <p>{ScoreComponent(s.score)}</p>
                </div>
              })}
            </div>;
          })}</div>;
      }

      eventContent = <div>
        {facultyVs}
        {compositionScore}
      </div>
      break;
  }

  return <div key={e.id} className="m-20">
    {eventContent}
    <p>{e.dateTime.toString()}</p>
    {MapLocationComponent(e.location)}
  </div>;
}