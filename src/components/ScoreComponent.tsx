import {Score} from "@/classes/score";

export function ScoreComponent(score?: Score) {
  if (!score)
    return <></>

  // TODO: Add other score types
  return <p key={score.id}>{score.numberScore}</p>
}