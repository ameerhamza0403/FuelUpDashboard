var GOOGLE_API_KEY = 'AIzaSyCzBaqFAu7qaotJmUby7ZNCpVjbj78wMsw';
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
var numRegex = /^\d+$/;
var firebaseConfig = {
  apiKey: 'AIzaSyC5DricRSN4aYok_FI0IvRCyjq4vqnNnRw',
  authDomain: 'fuelup-b28ac.firebaseapp.com',
  databaseURL: 'https://fuelup-b28ac.firebaseio.com',
  projectId: 'fuelup-b28ac',
  storageBucket: 'fuelup-b28ac.appspot.com',
  messagingSenderId: '949979550560',
  appId: '1:949979550560:web:84d6f112e15699be818405'
};

let randomId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

export {
  GOOGLE_API_KEY,
  emailRegex,
  passRegex,
  numRegex,
  firebaseConfig,
  randomId
};
