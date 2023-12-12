import {Athlete} from "@/classes/athlete";

export const seededAthletes: Athlete[] = [{
  id: 0,
  name: "Leonardo Amaro Rodríguez",
  nick: "Leo",
  dateOfBirth: "4/6/2001",
  photo: "/leo.jpeg"
}, {
  id: 2,
  name: "Alfredo Montero López",
  nick: "Freddy",
  dateOfBirth: "29/5/2001",
  photo: "/freddy.jpeg"
}, {
  id: 1,
  name: "Francisco Vicente Suárez Bellón",
  nick: "Paco",
  dateOfBirth: "4/6/2001",
  photo: "/paco.jpeg"
}, {
  id: 3,
  name: "Alfredo Montero López",
  nick: "Freddy",
  dateOfBirth: "29/5/2001",
  photo: "/freddy.jpeg"
}]

export const matcomAthletes: Athlete[] = [seededAthletes[0], seededAthletes[1]];

export const ekoAthletes: Athlete[] = [seededAthletes[2], seededAthletes[3]];