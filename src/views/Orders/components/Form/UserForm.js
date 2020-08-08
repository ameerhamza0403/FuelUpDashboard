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

  const [open, setOpen] = React.useState(false);

  console.log(props);
  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <Model
        className={classes.modal}
        open={props.open}
        title={'Order Details'}
        // size={'lg'}
        handleOk={async () => {
          setOpen(true);
          await firebase
            .firestore()
            .collection('Orders')
            .doc(props.data.id)
            .update({
              status: 'completed'
            });
          props.get();

          setOpen(false);
          props.close();

        }}
        handleCancel={() => {
          props.close();
        }}
        okText={'Mark Order Complete'}
        cancelText={'Back'}
        body={
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Order Status"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.status}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Order ID"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.id}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Order Amount"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.totalAmount}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Order Address"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.FormattedAddress.format}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Order Gas Detail"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.gasDetails.gasName}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Order Octance Rating"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.gasDetails.octaneRating}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gas Type"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.gasType}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gas Amount"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.gasAmount}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gas Price (Gallon)"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.gasDetails.fullPrice}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehical Make"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.make}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehical Model"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.model}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehical Year"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.year}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehical Color"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.color}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehical Plate Number"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.plateNumber}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Delivery"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.deliveryDate}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time start"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.timeStart}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time End"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.timeEnd}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Latitude"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.orderDetails.latitude}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Longitude"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.orderDetails.longitude}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Person Name"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.userDetail.name}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Person Phone "
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.userDetail.phone}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Person Email"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.userDetail.email}
                  // onChange={e => setOctRating(e.target.value)}
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
