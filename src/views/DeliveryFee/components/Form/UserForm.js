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

  const [price, setprice] = React.useState('');

  const [zipCode, setZipCode] = React.useState('');
  const [isZip, setIsZip] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  let clearForm = () => {
    setprice('');
    setZipCode('');
    setIsZip(true);
  };

  React.useEffect(() => {
    if (props.data != undefined) {
      setprice(props.data.price);
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
        title={'Add Delivery Fee'}
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
            .collection('DeliveryFee')
            .doc(randomId)
            .set({
              id: randomId,
              price: price,
              zipCode: isZip ? '' : zipCode
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
                  label="Price (USD)"
                  size="small"
                  type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setprice(e.target.value)}
                  value={price}
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
