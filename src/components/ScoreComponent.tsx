import {Score} from "@/classes/score";
import {Typography} from "@mui/material";

export interface ScoreComponentProps {
  score: Score | undefined;
}

export function ScoreComponent(props: ScoreComponentProps) {
  if (!props.score)
    return <></>

  // TODO: Add other score types
  return <Typography variant='subtitle1'>{props.score.numberScore}</Typography>
}