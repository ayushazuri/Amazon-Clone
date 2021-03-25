import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAaMeOMH3_uFDjm0s5Uu7ZqdcZxBGM3kDA",
	authDomain: "clone-d2903.firebaseapp.com",
	projectId: "clone-d2903",
	storageBucket: "clone-d2903.appspot.com",
	messagingSenderId: "966939292242",
	appId: "1:966939292242:web:cc974237b6f8a20067a58b",
	measurementId: "G-D6KZXLHRTM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
