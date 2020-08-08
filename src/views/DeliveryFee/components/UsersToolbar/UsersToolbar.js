import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import AddEditUser from '../Form/UserForm';

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    '&.MuiButton-containedPrimary': {
      backgroundColor: '#FF276D'
    }
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const [value, setValue] = React.useState();
  const [openForm, setOpenForm] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <AddEditUser
        open={openForm}
        close={() => setOpenForm(false)}
        get={()=>props.get(undefined, undefined)}

      />
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />

          <Button
            color="primary"
            className={classes.button}
            variant="contained"
            onClick={() => {
              setOpenForm(true);
            }}>
            Add Delivery Fee
          </Button>
        </div>
        <div className={classes.row}>
          {/* <SearchInput
            className={classes.searchInput}
            placeholder="Search Gas Tank"
            onChange={e => {
              setValue(e.target.value);
              console.log(e.target.value);
              props.get(undefined, e.target.value);
            }}
            value={value}
          /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
