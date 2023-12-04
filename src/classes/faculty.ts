import {Athlete} from "@/classes/athlete";

export class Faculty {
  id!: number;
  name!: string;
  acronym!: string;
  mascot!: string;
  logo!: string;
  athletes!: Athlete[];
  goldMedals!: number;
  silverMedals!: number;
  bronzeMedals!: number;
  ranking?: number;
}