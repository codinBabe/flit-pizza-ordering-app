import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: "pizza-ordering-app-414022.firebaseapp.com",
    projectId: "pizza-ordering-app-414022",
    storageBucket: "pizza-ordering-app-414022.appspot.com",
    messagingSenderId: process.env.FIRE_MESSAGESENDER_ID,
    appId: process.env.FIRE_APP_ID,
    measurementId: process.env.FIRE_MEASURE_ID
}
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };