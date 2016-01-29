/**
 * Created by rbwilliams on 29/01/2016.
 */
$(document).ready(function(){

    $.ajax({
        url: "starships.csv",
        async: false,
        success: function (csvd){
            data = $.csv.toObjects(csvd);
        },
        dataType: "text",
        complete: function(){
            populateTable(data);
            console.log(data);
        }
    })

});

function populateTable(data) {
    var tableBody = $('#table'),
        props = ["name", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed",
            "cargo_capacity_kg", "hyperdrive_rating", "docking_station_latitide", "docking_station_longitude"];
    $.each(data, function(i, info){
        var tr = $('<tr>');
        if (i != 0){
            $.each(props, function(i, prop){
                $('<td>').html(info[prop]).appendTo(tr);
            });
            tableBody.append(tr);
        }
    });
}