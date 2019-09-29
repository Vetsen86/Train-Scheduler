$(document).ready(function() {

    var database = firebase.database();

    var arrivalTime;
    var minutesAway;

    function calculateTime(time, frequency) {
        var timeConverted = moment(time, "HH:mm").subtract(1, "years");
        console.log(timeConverted);

        var diffTime = moment().diff(moment(timeConverted), "minutes");
        console.log("Difference: " + diffTime);

        var tRemainder = diffTime % frequency;

        minutesAway = frequency - tRemainder;

        arrivalTime = moment().add(minutesAway, "minutes");
        arrivalTime = moment(arrivalTime).format("hh:mm");
    }

    function trainToFirebase() {
        var name = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var frequency = $("#frequency").val();
        var time = $("#train-time").val();

        /*calculateTime(time, frequency);

        var newRow = $("<tr>");
        var nameData = $("<td>").text(name);
        var destinationData = $("<td>").text(destination);
        var frequencyData = $("<td>").text(frequency);
        var nextArrivalData = $("<td>").text(arrivalTime);
        var awayData = $("<td>").text(minutesAway);

        newRow.append(nameData);
        newRow.append(destinationData);
        newRow.append(frequencyData);
        newRow.append(nextArrivalData);
        newRow.append(awayData);

        $("tbody").append(newRow);*/

        database.ref().push({
            trainName: name,
            destination: destination,
            frequency: frequency,
            startTime: time
        });

    }

    $("#submit").on("click", function(e) {
        e.preventDefault();
        trainToFirebase();
        $("input").val("");
    });

    database.ref().on("child_added", function(snapshot) {

        console.log(snapshot.val());

        var time = snapshot.val().startTime;
        var frequency = snapshot.val().frequency;

        calculateTime(time, frequency);

        var newRow = $("<tr>");
        var nameData = $("<td>").text(snapshot.val().trainName);
        var destinationData = $("<td>").text(snapshot.val().destination);
        var frequencyData = $("<td>").text(snapshot.val().frequency);
        var nextArrivalData = $("<td>").text(arrivalTime);
        var awayData = $("<td>").text(minutesAway);

        newRow.append(nameData);
        newRow.append(destinationData);
        newRow.append(frequencyData);
        newRow.append(nextArrivalData);
        newRow.append(awayData);

        $("tbody").append(newRow);

    }, function(errorObject) {
        console.log("Errors: " + errorObject.code);
    });

});