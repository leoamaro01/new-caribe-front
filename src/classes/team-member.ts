import {Athlete} from "@/classes/athlete";

export class TeamMember {
  id!: number;
  teamId!: number;
  athlete!: Athlete;
  role!: string;
}