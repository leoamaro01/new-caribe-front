import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export interface YesNoDialogProps {
  show: boolean;
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  title: string;
  message: string;
  onYes: () => void;
  onNo: () => void;

}

export function YesNoDialogComponent(props: YesNoDialogProps) {
  return <Dialog open={props.show} onClose={props.onClose}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>{props.message}</DialogContent>
    <DialogActions>
      <Button onClick={props.onYes}>Si</Button>
      <Button onClick={props.onNo}>No</Button>
    </DialogActions>
  </Dialog>
}