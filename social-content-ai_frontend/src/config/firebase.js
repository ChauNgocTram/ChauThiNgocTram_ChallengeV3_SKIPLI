import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDBCPhOFLS1a3JEuNjSY0zf9nngnkUz5Tg",
  authDomain: "challengev3-chauthingoctram.firebaseapp.com",
  databaseURL: "https://challengev3-chauthingoctram-default-rtdb.firebaseio.com",
  projectId: "challengev3-chauthingoctram",
  storageBucket: "challengev3-chauthingoctram.appspot.com",
  messagingSenderId: "204766693887",
  appId: "1:204766693887:web:5815444c7659f88b4affca",
  measurementId: "G-X945R733C6"
};

const app = initializeApp(firebaseConfig);


const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, analytics };
