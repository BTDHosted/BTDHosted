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
    console.log("enters returnhighscore");

    // console.log("entering returnHighScore")
    // console.log(myDatabase.ref('/highScore'));
    // console.log(firebase.database().ref("highScore").on("value", function (snapshot) {
    //     highScore = snapshot.val();
    //   }));

    // console.log("@@@@@@@@@ab to print highscore");
    myDatabase.ref('highScore').on('value', function (snapshot){
        let tmp = snapshot.val().score;
        console.log("tmpppppdatabase highscore is = " + tmp);
        document.getElementById("highScore").innerHTML = "High Score: " + tmp;
        let tmpAsVal = parseInt(tmp);
        dataBaseHighScore = snapshot.val().score;
        console.log("isNan tmp? " + isNaN(tmp));
        console.log("typeof tmp" + typeof(tmp));
        console.log("isNan tmpVal? " + isNaN(tmpAsVal));


        // return(tmpAsVal);
    });
    // return firebase.database().ref("highScore").on("value", function (snapshot) {
    //     highScore = snapshot.val();
    //   });
    }
