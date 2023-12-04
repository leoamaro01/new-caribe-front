import {TeamMember} from "@/classes/team-member";

export class NormalTeam {
  id!: number;
  facultyId!: number;
  members!: TeamMember[];
  participants!: TeamMember[];
  substitutes!: TeamMember[];
}