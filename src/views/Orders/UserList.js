import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BackDrop } from 'components';

import { UsersToolbar, UsersTable } from './components';

import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async (page, search) => {
    setOpen(true);
    let datadb;
    if (page != undefined) {
      datadb = firebase
        .firestore()
        .collection('Orders')
        .limit(10)
        .orderBy('id')
        .startAt(page);
    } else if (search != undefined) {
      datadb = firebase.firestore().collection('Orders');
      // .limit(2);
      // .startAt(page == undefined ? 0 : page);
    } else {
      datadb = firebase
        .firestore()
        .collection('Orders')
        .limit(10);
      // .startAt(page == undefined ? 0 : page);
    }
    let data = await datadb.get();
    if (data) {
      let arr = [];
      data.forEach(doc => {
        if (search != undefined) {
          if (
            // doc
            //   .data()
            //   .name.toLowerCase()
            //   .search(search.toLowerCase()) != -1 ||
            // doc
            //   .data()
            //   .price.toLowerCase()
            //   .search(search.toLowerCase()) != -1 ||
            // doc
            //   .data()
            //   .rating.toLowerCase()
            //   .search(search.toLowerCase()) != -1 ||
            doc.data().id.search(search) != -1
          ) {
            arr.push(doc.data());
          }
        } else {
          arr.push(doc.data());
        }
      });
      setUsers(arr);
      setOpen(false);

      console.log(arr);
    }
  };

  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <div className={classes.root}>
        <span
          style={{ textAlign: 'center', padding: 10, fontFamily: 'Roboto' }}>
          {'Orders Management'.toUpperCase()}
        </span>
        <UsersToolbar get={getCustomerData} />
        <div className={classes.content}>
          <UsersTable users={users} get={getCustomerData} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserList;
