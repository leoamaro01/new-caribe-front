import {Athlete} from "@/classes/athlete";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {AthleteAvatar} from "@/components/AthleteAvatar";
import {Major} from "@/classes/major";

export interface AthleteComponentProps {
  athlete: Athlete;
  majors: Major[];
  hasPrivileges: boolean;
  onEditAthlete: (arg0: Athlete) => void
  onDeleteAthlete: (arg0: Athlete) => void
}

export function AthleteComponent(props: AthleteComponentProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader
          avatar={<AthleteAvatar athlete={props.athlete} width={64} height={64}/>}
          title={props.athlete.name}
          subheader={props.athlete.nick}/>
        <CardContent>
          <Typography sx={{my: 1}} variant="body2" color="text.secondary">
            Fecha de Nacimiento:{' '}{props.athlete.dateOfBirth}
          </Typography>
          {/*<br/>*/}
          {/*<Typography sx={{my: 1}} variant="body2" color="text.secondary">*/}
          {/*  Carrera:{' '}{props.majors.find(m => m.id == props.athlete.majorId)!.name}*/}
          {/*</Typography>*/}
        </CardContent>
        {props.hasPrivileges && <CardActions>
            <Button onClick={(e) => props.onEditAthlete(props.athlete)}
                    size="small">
                Editar
            </Button>
            <Button onClick={(e) => props.onDeleteAthlete(props.athlete)}
                    size="small">
                Eliminar
            </Button>
        </CardActions>}
      </Card>
    </Grid>
  );
}