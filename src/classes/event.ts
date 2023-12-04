import {MapLocation} from "@/classes/map-location";
import {NormalTeam} from "@/classes/normal-team";
import {TeamCompositionScore} from "@/classes/team-composition-score";
import {ComposedTeam} from "@/classes/composed-team";
import {TeamParticipantScore} from "@/classes/team-participant-score";
import {TeamScore} from "@/classes/team-score";
import {Match} from "@/classes/match";

export class Event {
  id!: number;
  type!: string;
  dateTime!: Date;
  location!: MapLocation;

  composedTeams?: ComposedTeam[];
  compositionScores?: TeamCompositionScore[];

  participantScoredTeams?: NormalTeam[];
  participantScores?: TeamParticipantScore[];

  teamScores?: TeamScore[];

  matchEventTeams?: NormalTeam[];
  matches?: Match[];
}