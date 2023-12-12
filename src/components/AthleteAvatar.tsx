import {Avatar} from "@mui/material";
import {Athlete} from "@/classes/athlete";

export function AthleteAvatar({athlete, width, height}: { athlete: Athlete, width: number, height: number }) {
  return <Avatar src={URL.createObjectURL(athlete.photo)} alt={`${athlete.name} picture`}
                 sx={{width: width, height: height}}/>;
}

