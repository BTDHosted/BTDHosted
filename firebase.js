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
function updateHighScore(user, score) {
    // A post entry.
    console.log("entering updateHighScore");
    var postData = {
        user: user,
        score: score
    };
    //console.log(myDatabase.ref("highScore"));
    return myDatabase.ref("highScore").set(postData);
}

function returnHighScore(){
    myDatabase.ref('highScore').on('value', function (snapshot){
        dataBaseHighScore = snapshot.val().score;
        document.getElementById("highScore").innerHTML = "High Score: " + dataBaseHighScore;
    });
    }
