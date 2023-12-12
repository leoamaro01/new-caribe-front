import {Faculty} from "@/classes/faculty";
import {FacultyAvatar} from "@/components/FacultyAvatar";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography} from "@mui/material";

export interface FacultyComponentProps {
  faculty: Faculty;
  onEditFaculty: (arg0: Faculty) => void;
  onDeleteFaculty: (arg0: Faculty) => void;
}

export default function FacultyComponent(props: FacultyComponentProps) {
  const faculty = props.faculty;
  let rankingColor;
  switch (faculty.ranking) {
    case 1:
      rankingColor = "gold";
      break;
    case 2:
      rankingColor = "silver";
      break;
    case 3:
      rankingColor = "#CD7F32";
      break;
    default:
      rankingColor = "";
      break;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader avatar={<FacultyAvatar faculty={faculty} width={128} height={128}/>}
                    title={faculty.name}
                    subheader={faculty.acronym}/>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Mascota: {faculty.mascot}
          </Typography>
          <Typography variant="h5" sx={{mt: 1}}>
            Medallas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            🥇 Oro: {faculty.goldMedals}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            🥈 Plata: {faculty.silverMedals}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            🥉 Bronce: {faculty.bronzeMedals}
          </Typography>
          <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
            <Typography variant="h5" sx={{alignSelf: 'center'}}>
              Ranking:
            </Typography>
            <Typography variant="h3"
                        sx={{
                          alignSelf: 'center',
                          ml: 1,
                          color: rankingColor,
                          fontStyle: 'italic'
                        }}>#{faculty.ranking}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button href={`/faculties/${faculty.acronym.toLowerCase()}`} size='small'>Ver</Button>
          <Button onClick={(e) => props.onEditFaculty(props.faculty)}
                  size='small'>
            Editar
          </Button>
          <Button onClick={(e) => props.onDeleteFaculty(props.faculty)}
                  size='small'>
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

