import {Avatar} from "@mui/material";
import {Athlete} from "@/classes/athlete";
import {useEffect, useState} from "react";
import {FetchAthletePhoto} from "@/classes/requests";

export function AthleteAvatar({athlete, width, height}: { athlete: Athlete, width: number, height: number }) {
  const [athletePhoto, setAthletePhoto] = useState<File | undefined>(undefined);

  useEffect(() => {
    FetchAthletePhoto(athlete.id)
      .then(setAthletePhoto);
  }, [athlete]);

  return athletePhoto ?
    <Avatar src={URL.createObjectURL(athletePhoto)} alt={`${athlete.name} picture`}
            sx={{width: width, height: height}}/>
    : <Avatar sx={{width: width, height: height}}>{athlete.name[0]}</Avatar>;
}

