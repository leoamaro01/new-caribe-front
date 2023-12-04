import {seededFaculties} from "@/seed/faculties";
import {Faculty} from "@/classes/faculty";

export function fetchFaculties(): Faculty[] {
  return seededFaculties;
}