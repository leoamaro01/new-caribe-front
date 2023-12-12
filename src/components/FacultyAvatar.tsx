import {Faculty} from "@/classes/faculty";
import {Avatar} from "@mui/material";
import {useEffect, useState} from "react";
import {FetchFacultyPhoto} from "@/classes/requests";

export function FacultyAvatar({faculty, width, height}: { faculty: Faculty, width: number, height: number }) {
  const [facultyLogo, setFacultyLogo] = useState<File | undefined>(undefined);

  useEffect(() => {
    FetchFacultyPhoto(faculty.id)
      .then(setFacultyLogo);
  }, [faculty]);

  return facultyLogo ?
    <Avatar src={URL.createObjectURL(facultyLogo)} alt={`${faculty.name} picture`}
            sx={{width: width, height: height}}/>
    : <Avatar sx={{width: width, height: height}}>{faculty.name[0]}</Avatar>;
}