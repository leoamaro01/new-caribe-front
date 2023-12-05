import {seededFaculties} from "@/seed/faculties";
import {Faculty} from "@/classes/faculty";
import {Event} from "@/classes/event";
import {seededEvents} from "@/seed/events";

export function fetchFaculties(): Faculty[] {
  return seededFaculties;
}

export function fetchEvents(): Event[] {
  return seededEvents;
}