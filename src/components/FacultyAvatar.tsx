import {Faculty} from "@/classes/faculty";
import {Avatar} from "@mui/material";

export function FacultyAvatar({faculty, width, height}: { faculty: Faculty, width: number, height: number }) {
  return <Avatar src={URL.createObjectURL(faculty.logo)} alt={`${faculty.name} picture`}
                 sx={{width: width, height: height}}/>;
}