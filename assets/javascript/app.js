
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOzCsYxFJvFfwKiJ-MJrlSDNnzT-hHYv4",
    authDomain: "trainschedulemomentjs.firebaseapp.com",
    databaseURL: "https://trainschedulemomentjs.firebaseio.com",
    projectId: "trainschedulemomentjs",
    storageBucket: "trainschedulemomentjs.appspot.com",
    messagingSenderId: "400888679638"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "LT").format("LT");
  var trnRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    destination: trnDestination,
    firstTrain: trnStart,
    frequency: trnRate,
  };

  // Uploads train data to the database
  database.ref().push(newTrn);


  // Alert
  alert("Train schedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});


database.ref().on("child_added", function(snapshot){
var train = snapshot.val().name;
var dest = snapshot.val().destination;
var tFrequency = snapshot.val().frequency;
var firstTime = snapshot.val().firstTrain;




    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var anotherTrain = nextTrain.format("HH:mm:ss a")



$("#train-table> tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + tFrequency + "</td><td>" + anotherTrain+ "</td><td>" + tMinutesTillTrain + "</td><td>");
});
