import {Event, EventType} from "@/classes/event";
import {Faculty} from "@/classes/faculty";
import {TeamScoredEventComponent} from "@/components/TeamScoredEventComponent";
import {MatchEventComponent} from "@/components/MatchEventComponent";
import {ParticipantScoredEventComponent} from "@/components/ParticipantScoredEventComponent";
import {ComposedEventComponent} from "@/components/ComposedEventComponent";

export interface EventComponentProps {
  event: Event;
  faculties: Faculty[];
}

export function EventComponent(props: EventComponentProps) {
  switch (props.event.type) {
    case EventType.Composed:
      return <ComposedEventComponent event={props.event} faculties={props.faculties}/>;
    case EventType.ParticipantScored:
      return <ParticipantScoredEventComponent event={props.event} faculties={props.faculties}/>;
    case EventType.TeamScored:
      return <TeamScoredEventComponent event={props.event} faculties={props.faculties}/>;
    case EventType.MatchEvent:
      return <MatchEventComponent event={props.event} faculties={props.faculties}/>;
    default:
      throw new Error("Event type not found");
  }
}