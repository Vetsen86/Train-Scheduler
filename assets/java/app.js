$(document).ready(function() {

    function renderTrains() {
        var name = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var frequency = $("#frequency").val();

        var newRow = $("<tr>");
        var nameData = $("<td>").text(name);
        var destinationData = $("<td>").text(destination);
        var frequencyData = $("<td>").text(frequency);
        var nextArrivalData = $("<td>").text("0");
        var awayData = $("<td>").text("0");

        newRow.append(nameData);
        newRow.append(destinationData);
        newRow.append(frequencyData);
        newRow.append(nextArrivalData);
        newRow.append(awayData);

        $("tbody").append(newRow);



    }

    $("#submit").on("click", function(e) {
        e.preventDefault();
        renderTrains();
    });

});