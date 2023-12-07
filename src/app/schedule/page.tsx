import {Event} from "@/classes/event";
import {fetchEvents, fetchFaculties} from "@/classes/utilities";
import {EventComponent} from "@/components/EventComponent";
import {Faculty} from "@/classes/faculty";

export default function SchedulePage() {
  let events: Event[] = fetchEvents();
  let faculties: Faculty[] = fetchFaculties();

  return <div>
    {events.map((event) => EventComponent(event, faculties))}
  </div>
}