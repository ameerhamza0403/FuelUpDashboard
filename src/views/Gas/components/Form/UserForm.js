import React from 'react';
import Model from 'components/Dialog/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import * as fn from '../../../../common/variables/constants';
import { BackDrop } from 'components';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  TextField: {
    minWidth: '100%'
  }
}));

let AddEditUser = props => {
  const classes = useStyles();
  const [gasName, setGasName] = React.useState('');
  const [octRating, setOctRating] = React.useState('');
  const [fullPrice, setFullPrice] = React.useState('');
  const [halfPrice, setHalfPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [isZip, setIsZip] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  let clearForm = () => {
    setGasName('');
    setOctRating('');
    setFullPrice('');
    setHalfPrice('');
    setDescription('');
    setZipCode('');
    setIsZip(true);
  };

  React.useEffect(() => {
    if (props.data != undefined) {
      setGasName(props.data.gasName);
      setOctRating(props.data.octaneRating);
      setFullPrice(props.data.fullPrice);
      setHalfPrice(props.data.halfPrice);
      setDescription(props.data.description);
      setZipCode(props.data.zipCode);
      setIsZip(props.data.zipCode == '' ? true : false);
    } else {
      clearForm();
    }
  }, [props.data]);

  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <Model
        className={classes.modal}
        open={props.open}
        title={'Add Gas Tank'}
        handleOk={() => {
          setOpen(true);
          let randomId = '';
          if (props.data == undefined) {
            randomId = fn.randomId();
          } else {
            randomId = props.data.id;
          }

          firebase
            .firestore()
            .collection('Gas')
            .doc(randomId)
            .set({
              id: randomId,
              gasName: gasName.toUpperCase(),
              description: description,
              fullPrice: fullPrice,
              halfPrice: halfPrice,
              zipCode: isZip ? '' : zipCode,
              octaneRating: octRating
            })
            .then(() => {
              clearForm();
              setOpen(false);

              props.close();
              props.get();
            })
            .catch(error => {
              setOpen(false);
              props.get();

              console.error('Error writing document: ', error);
              alert('An Error has Occured');
            });
        }}
        handleCancel={() => {
          clearForm();
          props.close();
        }}
        okText={'Save'}
        cancelText={'Cancel'}
        body={
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Name of Gas"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setGasName(e.target.value)}
                  value={gasName}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Ocatne Rating"
                  size="small"
                  type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={octRating}
                  onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  checked={isZip}
                  onChange={() => setIsZip(!isZip)}
                  name="isZip"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                Genral Scenerio where zip code are not defined
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Zip Code"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  disabled={isZip}
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Price Per Gallon"
                  size="small"
                  type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setFullPrice(e.target.value)}
                  value={fullPrice}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price Per Half Gallon"
                  type="number"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  value={halfPrice}
                  onChange={e => setHalfPrice(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default AddEditUser;
