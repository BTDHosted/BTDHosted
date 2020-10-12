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
    // console.log("entering returnHighScore")
    // console.log(myDatabase.ref('/highScore'));
    // console.log(firebase.database().ref("highScore").on("value", function (snapshot) {
    //     highScore = snapshot.val();
    //   }));

    // console.log("@@@@@@@@@ab to print highscore");
    myDatabase.ref("highScore").on("child_added", function (snapshot){
        console.log("database highscore is = " + snapshot.val().score);
        return(snapshot.val().score);
    });
    // return firebase.database().ref("highScore").on("value", function (snapshot) {
    //     highScore = snapshot.val();
    //   });
    }
