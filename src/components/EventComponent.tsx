import {Event} from "@/classes/event";
import {Faculty} from "@/classes/faculty";
import {FacultyImage} from "@/components/FacultyComponent";
import {JSX} from "react";
import {MapLocationComponent} from "@/components/MapLocationComponent";
import {ScoreComponent} from "@/components/ScoreComponent";
import {TeamMember} from "@/classes/team-member";
import {NormalTeam} from "@/classes/normal-team";

export function EventComponent(e: Event, faculties: Faculty[]) {
    let eventContent;
    let facultyVs: JSX.Element[];
    switch (e.type) {
        case "TeamEvent":
            if (!e.teamScores)
                throw new Error("No teams specified on TeamEvent");

            facultyVs = [];

            for (let s of e.teamScores) {
                const teamFaculty = faculties.find(f => f.id == s.team.facultyId);
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
            let participants, substitutes: {team: NormalTeam, members: TeamMember[]}[];
            let participantElements, substituteElements: {team:JSX.Element, members: JSX.Element[]}[];

            for (let s of e.teamScores) {
                participants.push({team: s.team, members: s.team.participants});
                substitutes.push({team: s.team, members: s.team.participants});

                const teamFaculty = faculties.find(f => f.id == s.team.facultyId);
                facultyVs.push(<div key={teamFaculty.id}>
                    <p>{teamFaculty.acronym}</p>
                    {FacultyImage(teamFaculty, "rounded-3xl flex-shrink-0", 125, 125)}
                </div>);
                facultyVs.push(<p>VS</p>)
            }

            facultyVs.pop();


            participantElements = e.participantScores?.map(ps => {
                let p = participants.find(m => m.id == ps.participantId);

                return <p key={ps.participantId}>{p.athlete.name} [{p.role}] -&gt; {ScoreComponent(ps.score)}</p>;
            });

            substituteElements = .map(ps => {
                let p = participants.find(m => m.id == ps.participantId);

                return <p key={ps.participantId}>{p.athlete.name} [{p.role}] -&gt; {ScoreComponent(ps.score)}</p>;
            });

            eventContent = (<div>
                {facultyVs}
            </div>)

            break;
    }

    return <div key={e.id}>
        {eventContent}
        <p>{e.dateTime}</p>
        {MapLocationComponent(e.location)}
    </div>;
}