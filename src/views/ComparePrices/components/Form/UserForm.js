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
  const [price, setprice] = React.useState('');
  const [prices, setprices] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [open, setOpen] = React.useState(false);

  let clearForm = () => {
    setGasName('');
    setOctRating('');
    setprice('');
    setprices('');
    setZipCode('');
  };

  React.useEffect(() => {
    if (props.data != undefined) {
      setGasName(props.data.gasName);
      setOctRating(props.data.octaneRating);
      setprice(props.data.price);
      setprices(props.data.prices);
      setZipCode(props.data.zipCode);
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
        title={'Add Price Comparison'}
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
            .collection('Price')
            .doc(randomId)
            .set({
              id: randomId,
              gasName: gasName.toUpperCase(),
              price: price,
              prices: prices,
              zipCode: zipCode,
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
              
           
              <Grid item xs={8}>
                <TextField
                  label="Normal Price"
                  size="small"
                  type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setprice(e.target.value)}
                  value={price}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Zip Code"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Price at Zip Code"
                  type="number"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  value={prices}
                  onChange={e => setprices(e.target.value)}
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
