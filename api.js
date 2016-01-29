/**
 * Created by rbwilliams on 29/01/2016.
 */

var data;
var lat;
var long;

$(document).ready(function(){

    $.ajax({
        url: "starships.csv",
        async: false,
        success: function (csvd){
            data = $.csv.toObjects(csvd);
            userLocation(data);
        },
        dataType: "text"
    })


});

function populateTable(data) {
    $('table > tbody > tr').remove();

    var tableBody = $('#table'),
        props = ["name", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed",
            "cargo_capacity_kg", "hyperdrive_rating", "docking_station_latitide", "docking_station_longitude", "distance"];

    $.each(data, function(i, info){
        var tr = $('<tr>');
            $.each(props, function(i, prop){
                $('<td>').html(info[prop]).appendTo(tr);
            });
        tableBody.append(tr);
    });
}

function userLocation(data){
    var output = document.getElementById("output");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            output.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + long + '°</p>';
            calculateDistance(lat, long);
            //sort(lat, long);
            populateTable(data);
        });
    } else {

    }
}

function calculateDistance(lat, long){
    $.each(data, function(i, location){
        data[i].distance = distance(lat, long, location["docking_station_latitide"], location["docking_station_longitude"]).toString();
    });
}

function sortAsc(){
    data.sort(function(a, b){
        return distance(lat, long, a["docking_station_latitide"], a["docking_station_longitude"]) -
            distance(lat, long, b["docking_station_latitide"], b["docking_station_longitude"]);
    });
    populateTable(data);
}
function sortDes(){
    data.sort(function(a, b){
        return distance(lat, long, b["docking_station_latitide"], b["docking_station_longitude"]) -
                distance(lat, long, a["docking_station_latitide"], a["docking_station_longitude"]);
    });
    populateTable(data);
}

function distance(lat1, lon1, lat2, lon2){
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;

    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta/180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    //console.log(dist);

    return dist;
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
