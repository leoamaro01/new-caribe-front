import {MapLocation} from "@/classes/map-location";
import {NormalTeam} from "@/classes/normal-team";
import {TeamCompositionScore} from "@/classes/team-composition-score";
import {ComposedTeam} from "@/classes/composed-team";
import {TeamParticipantScore} from "@/classes/team-participant-score";
import {TeamScore} from "@/classes/team-score";
import {Match} from "@/classes/match";
import {Sport} from "@/classes/sport";
import {Discipline} from "@/classes/discipline";

export enum EventType {
  Composed = "Composed",
  ParticipantScored = "ParticipantScored",
  TeamScored = "TeamScored",
  MatchEvent = "MatchEvent"

}

export class Event {
  id!: number;
  type!: EventType;
  dateTime!: Date;
  location!: MapLocation;

  sport!: Sport;
  discipline!: Discipline;

  composedTeams?: ComposedTeam[];
  compositionScores?: TeamCompositionScore[];

  participantScoredTeams?: NormalTeam[];
  participantScores?: TeamParticipantScore[];

  teamScores?: TeamScore[];

  matchEventTeams?: NormalTeam[];
  matches?: Match[];
}