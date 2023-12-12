import {Composition} from "@/classes/composition";

export class ComposedTeam {
  id!: number;
  name!: string;
  facultyId!: number;
  compositions!: Composition[];
}