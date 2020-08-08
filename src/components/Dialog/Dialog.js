import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& div .MuiDialogTitle-root': {
      backgroundColor: '#FF276D'
    }
  },
  texth2: {
    '& h2.MuiTypography-root.MuiTypography-h6':{
      color: 'white',
      textAlign: 'center'
    }
  },
  body: {
    paddingTop: 20
  }
}));

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(props.size));
  const classes = useStyles();
  React.useEffect(() => {
    console.log('in the useEffect');
    if (props.open != open) {
      handleClick(props.open);
      console.log('opening..');
    }
  }, [props]);
  const handleClick = open => {
    setOpen(open);
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        className={classes.root}
        fullWidth
        onClose={props.handleCancel}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" className={classes.texth2}>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.body}>
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleCancel} color="primary">
            {props.cancelText}
          </Button>
          <Button onClick={props.handleOk} color="primary" autoFocus>
            {props.okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
