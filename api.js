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
            //dropdownList(data);
            populateTable(data);
            sort(data);
            //console.log(data);
        }
    })

});

function populateTable(data) {
    var tableBody = $('#table'),
        props = ["name", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed",
            "cargo_capacity_kg", "hyperdrive_rating", "docking_station_latitide", "docking_station_longitude"];
    $.each(data, function(i, info){
        var tr = $('<tr>');
            $.each(props, function(i, prop){
                $('<td>').html(info[prop]).appendTo(tr);
            });
        tableBody.append(tr);

    });
}

function sort(data){
    var output = document.getElementById("output");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            output.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + long + '°</p>';
            console.log(position.coords.latitude, position.coords.longitude);
        });
    } else {

    }
}

function distance(lat1, lon1, lat2, lon2){
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;

    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta/180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist =

}

/*
function dropdownList(data){
    var list = $('#list');
    for(var val in data) {
        $('<option />', {value: val, text: JSON.stringify(data[val])}).appendTo(list);
    }
    /!*$.each(data["key"], function(i, prop){
        console.log(prop);
    });*!/
}*/
