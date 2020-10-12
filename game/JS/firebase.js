var firebaseConfig = {
    apiKey: "AIzaSyD3Y0XZLHKykgMhfWAmSOlWxYybgaxifts",
    authDomain: "bloonstowerdefense-4719a.firebaseapp.com",
    databaseURL: "https://bloonstowerdefense-4719a.firebaseio.com",
    projectId: "bloonstowerdefense-4719a",
    storageBucket: "bloonstowerdefense-4719a.appspot.com",
    messagingSenderId: "487607615572",
    appId: "1:487607615572:web:729940b65d871f8b1d6dc1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let myDatabase = firebase.database();


  //Push the score to the database
function updateHighScore(score) {
    // A post entry.
    var postData = {
        score: score
    };
    console.log(myDatabase.ref("highScore"));
    return myDatabase.ref("highScore").push(postData);
}

function returnHighScore(){
    console.log("entering returnHighScore")
    console.log(myDatabase.ref('/highScore'));
    return myDatabase.ref("highScore");
}
