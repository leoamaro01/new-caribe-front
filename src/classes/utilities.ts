import {Faculty} from "@/classes/faculty";
import {Event} from "@/classes/event";
import {seededEvents} from "@/seed/events";

export async function fetchFaculties(): Promise<Faculty[]> {
    // return seededFaculties;
    return await fetch("localhost:5136/api/Faculties?year=2023").then(r => r.json());
}

export function fetchEvents(): Event[] {
    return seededEvents;
}