import {Event} from "@/classes/event";
import {ekoAthletes, matcomAthletes} from "@/seed/athletes";
import {NormalTeam} from "@/classes/normal-team";
import {ComposedTeam} from "@/classes/composed-team";

export const seededTeams: NormalTeam[] = [{
  id: 0,
  facultyId: 0,
  participants: [{
    id: 0,
    teamId: 0,
    role: "Pitcher",
    athlete: matcomAthletes[0]
  }],
  members: [{
    id: 0,
    teamId: 0,
    role: "Pitcher",
    athlete: matcomAthletes[0]
  }],
  substitutes: []
}, {
  id: 1,
  facultyId: 1,
  participants: [{
    id: 1,
    teamId: 1,
    role: "Pitcher",
    athlete: ekoAthletes[0]
  }],
  members: [{
    id: 1,
    teamId: 1,
    role: "Pitcher",
    athlete: ekoAthletes[0]
  }],
  substitutes: []
}]

export const seededComposedTeams: ComposedTeam[] = [{
  id: 2,
  facultyId: 0,
  compositions: [{
    id: 0,
    participants: [{
      id: 2,
      teamId: 2,
      athlete: matcomAthletes[1],
      role: "Ballet"
    }]
  }]
}, {
  id: 3,
  facultyId: 1,
  compositions: [{
    id: 1,
    participants: [{
      id: 3,
      teamId: 3,
      athlete: ekoAthletes[0],
      role: "Conga"
    }]
  }]
}]

export const seededEvents: Event[] = [{
  id: 0,
  type: 'TeamScored',
  dateTime: new Date('2021-01-03T00:00:00'),
  location: {
    id: 0,
    name: "Barranquilla del SEDER",
    address: "Calle 1 # 1 - 1",
    googleMapsUrl: "google.com"
  },
  teamScores: [{
    team: seededTeams[0],
    score: undefined
  }, {
    team: seededTeams[1],
    score: undefined
  }]
}, {
  id: 1,
  type: 'ParticipantScored',
  dateTime: new Date('2021-01-02T00:00:00'),
  location: {
    id: 0,
    name: "Barranquilla del SEDER",
    address: "Calle 1 # 1 - 1",
    googleMapsUrl: "google.com"
  },
  participantScoredTeams: [seededTeams[0], seededTeams[1]]
}, {
  id: 2,
  type: 'MatchEvent',
  dateTime: new Date('2021-01-04T00:00:00'),
  location: {
    id: 0,
    name: "Barranquilla del SEDER",
    address: "Calle 1 # 1 - 1",
    googleMapsUrl: "google.com"
  },
  matchEventTeams: [seededTeams[0], seededTeams[1]]
}, {
  id: 3,
  type: 'Composed',
  dateTime: new Date('2021-01-05T00:00:00'),
  location: {
    id: 0,
    name: "Barranquilla del SEDER",
    address: "Calle 1 # 1 - 1",
    googleMapsUrl: "google.com"
  },
  composedTeams: seededComposedTeams
}]