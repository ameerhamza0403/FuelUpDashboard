import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import * as firebase from 'firebase';
import { firebaseConfig } from './common/variables/constants';


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    // this.notify();
  }
  // notify = async () => {
  //   var audio = new Audio(require('./assets/notification.mp3'));
  //   const messaging = firebase.messaging();

  //   await Notification.requestPermission();

  //   messaging
  //     .getToken()
  //     .then(currentToken => {
  //       if (currentToken) {
  //         console.log(currentToken);

  //         // sendTokenToServer(currentToken);
  //         // updateUIForPushEnabled(currentToken);
  //       } else {
  //         // Show permission request.
  //         console.log(
  //           'No Instance ID token available. Request permission to generate one.'
  //         );
  //         // Show permission UI.
  //         // updateUIForPushPermissionRequired();
  //         // setTokenSentToServer(false);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('An error occurred while retrieving token. ', err);
  //       // showToken('Error retrieving Instance ID token. ', err);
  //       // setTokenSentToServer(false);
  //     });

  //   messaging.onMessage(payload => {
  //     console.log('App.js', payload);
  //     audio.play();
  //   });

  //   messaging.onTokenRefresh(newToken => {
  //     messaging
  //     .getToken()
  //     .then(currentToken => {
  //       if (currentToken) {
  //         console.log(currentToken);

  //         // sendTokenToServer(currentToken);
  //         // updateUIForPushEnabled(currentToken);
  //       } else {
  //         // Show permission request.
  //         console.log(
  //           'No Instance ID token available. Request permission to generate one.'
  //         );
  //         // Show permission UI.
  //         // updateUIForPushPermissionRequired();
  //         // setTokenSentToServer(false);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('An error occurred while retrieving token. ', err);
  //       // showToken('Error retrieving Instance ID token. ', err);
  //       // setTokenSentToServer(false);
  //     });
  //   });
  //   // messaging.setBackgroundMessageHandler(payload => {
  //   //   console.log('App.js', payload);
  //   //   audio.play();
  //   // });
  // };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
