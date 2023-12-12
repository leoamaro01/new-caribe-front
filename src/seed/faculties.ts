import {Faculty} from "@/classes/faculty";
import {ekoAthletes, matcomAthletes} from "@/seed/athletes";

export const seededFaculties: Faculty[] = [{
  id: 0,
  acronym: "MATCOM",
  logo: "/matcom.svg",
  athletes: matcomAthletes,
  bronzeMedals: 0,
  goldMedals: 999,
  silverMedals: 0,
  mascot: "Cuervo 🐦‍⬛",
  name: "Facultad de Matemática y Computación",
  ranking: 1
}, {
  id: 1,
  acronym: "EKO",
  logo: "/economia.svg",
  athletes: ekoAthletes,
  bronzeMedals: 1,
  goldMedals: 0,
  silverMedals: 0,
  mascot: "León 🦁",
  name: "Facultad de Economía",
  ranking: 3
}];