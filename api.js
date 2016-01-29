/**
 * Created by rbwilliams on 29/01/2016.
 */
$(document).ready(function(){

    $.ajax({
        url: "starships.csv",
        async: false,
        success: function (csvd){
            data = $.csv.toArrays(csvd);
        },
        dataType: "text",
        complete: function(){
            console.log(data);
        }
    })

});
