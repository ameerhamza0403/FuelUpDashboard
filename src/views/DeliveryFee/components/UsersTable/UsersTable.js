import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { getInitials } from 'helpers';
import AddEditUser from '../Form/UserForm';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const handlePageChange = (event, pagee) => {
    if (pagee < page) {
      props.get();
    } else {
      props.get(props.users[props.users.length - 1].id);
    }
    setPage(pagee);
    console.log(pagee);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <React.Fragment>
      <AddEditUser
        open={openForm}
        close={() => setOpenForm(false)}
        data={selectedUsers}
        get={() => props.get(undefined, undefined)}
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>View</TableCell>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell>Zip Code</TableCell>
                    <TableCell>Price(USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 &&
                    users.slice(0, rowsPerPage).map(user => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}

                        // selected={selectedUsers.indexOf(user.id) !== -1}
                      >
                        <TableCell>
                          <div
                            style={{
                              padding: 0,
                              margin: 0,
                              minWidth: 50
                            }}>
                            <VisibilityIcon
                              onClick={() => {
                                setSelectedUsers(user);
                                setOpenForm(true);
                                console.log('here', user.id);
                              }}
                            />
                            <DeleteForeverIcon
                              onClick={() => {
                                firebase
                                  .firestore()
                                  .collection('DeliveryFee')
                                  .doc(user.id)
                                  .delete();
                                props.get(undefined, undefined);
                              }}
                            />
                          </div>
                        </TableCell>

                        <TableCell>{user.zipCode}</TableCell>
                        <TableCell>{user.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            // count={users.length}
            count={-1}
            onChangePage={handlePageChange}
            // onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
