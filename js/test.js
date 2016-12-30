var arrayDevice=[], aryHum=[], aryTemp=[], aryGas=[], aryLat=[], aryLong=[], markers=[],aryLoc=[],aryTstamp=[];
var ctx = document.getElementById("myChart");
var ctx2 = document.getElementById("myChart2");
var marker, i, vicon, mydate, myChart, myChart2, directionsDisplay, directionsService, start = "", end = "", request, latlong, contentString;
var color = Chart.helpers.color;
var chartColors = window.chartColors;
var shwdvcstatus="";
var idd = getUrlParameter('usrID');
var valpass;


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function()
{   
    $('#appendOnIt').on('click','#removeIt', function(e) {
        $(this).remove();
    });
    //for Home
    $.getJSON("server/view.php?uID="+idd, function(result){
        //$.each(result, function(i, field){
            $("#txtChange").text(result.fld_homename);
            $("#h-name").text(result.fld_homename);
            $("#h-address").text(result.fld_zipcode+" "+result.fld_city);
            $("#h-nname").val(result.fld_homename);
            $("#address").val(result.fld_address);
            $("#province").val(result.fld_province);
            $("#city").val(result.fld_city);
            $("#zipcode").val(result.fld_zipcode);
            //console.log(result);
        //});
    });

    //for Users
    $.getJSON("server/view.php?uID2="+idd, function(result){
            $("#uemail").text(result.fld_email);
            $("#u-email").text(result.fld_email);
            $("#u-name").text(result.fld_name);
            valpass = result.fld_password;
    });
    //for Contacts
    $.getJSON("server/view.php?uCon="+idd, function(result){
            $("#c-contact").text(result.fld_cname+" "+result.fld_cnum);
            var a = document.getElementById('c-contact');
            var cnum = result.fld_cnum;
            if (a) {
                a.href = "tel:"+cnum;
            }
    });
    
    getDeviceStatus(); //Get Status from Dweet.io   
    //getUserStatus();
    getChartData(); //Get and Display Chart Data
    
    for (i = 0; i < aryHum.length; i++) { 
      $("#weather_report").append('<tr><td>'+aryHum[i]+'%'+'</td><td>'+aryTemp[i]+'°C'+'</td><td>'+aryGas[i]+'</td><td>'+aryTstamp[i]+'</td></tr>');
    }
});

function appendit(){
    var fmName =  $("#fmName").val();
    var fmEmail = $("#fmEmail").val();
    $("#appendOnIt").append("<li><div class='collapsible-header'>"+fmName+"<span class='badge grey-text text-lighten-1'>"+fmEmail+" <a id='removeIt' class='red'><i class='fa fa-times right red-text' aria-hidden='true'></i></a></span></div></li>");
    
}

function conAppend(){
    var ccname =  $("#c-cname").val();
    var ccnum = $("#c-cnum").val();
    $("#contactAppend").append("<li><div class='collapsible-header'><a href='tel:"+ccnum+"'>"+ccname+" "+ccnum+"</a></div></li>");
}

setInterval(function(){
  $('#txtChange').fadeOut(500, function() {
        var $this = $(this);
        $this.text($this.text() == 'Gerry\'s Home' ? '29°C Mostly Cloudy' : 'Gerry\'s Home');        
        $this.toggleClass('first second');        
        $this.fadeIn(500);
    });
}, 3000);

function getDeviceStatus(){//Start of getDeviceStatus function
    $.ajax({//for devices
        type: "GET",
        url: "server/view.php?uDevice="+idd,
        async: false,
        dataType: 'json',
        success: function(udevice){
          console.log(udevice);
            shwdvcstatus = udevice.fld_devicename;
        }
    }); //end of ajax function  

    $.ajax({
        type: "GET",
        url: "https://dweet.io:443/get/dweets/for/"+shwdvcstatus,
        async: false,
        success: function(myData){
          //console.log(myData);
          for (var i=4; i>=0;  i--) {
            aryHum.push(myData.with[i].content.Humidity);
            aryTemp.push(myData.with[i].content.Temperature);
            aryGas.push(myData.with[i].content.Gas);
            aryLat.push(myData.with[i].content.Latitude);
            aryLong.push(myData.with[i].content.Longitude);
            mydate = new Date(myData.with[i].created);
            //aryTstamp.push(mydate.getHours()+':'+mydate.getMinutes()+':'+mydate.getSeconds());
            aryTstamp.push(mydate.getHours()+':'+mydate.getMinutes()+':'+mydate.getSeconds());


          };
        }
    }); //end of ajax function  
    //}//end of for loop
}//end of getDeviceStatus function

//Display data on the chart
function getChartData(){//Start of getChartData function
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: aryTstamp,
            datasets: [{
                label: 'Hum',
                data: aryHum,
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 1,
                    fill: false
            },
            {
                label: 'Temp',
                data: aryTemp,
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                borderColor: window.chartColors.green,
                borderWidth: 1,
                    fill: false
            },
            {
                label: 'Gas',
                data: aryGas,
                backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
                borderColor: window.chartColors.yellow,
                borderWidth: 1,
                    fill: false
            }]
        },
        options: {
            responsive:true,
            tooltips: {
                    mode: 'index',
                    intersect: false,
            },
            hover: {
                    mode: 'nearest',
                    intersect: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    display:true,
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }]
            }
        }
    });//end of myChart
    
}//End of getChartData function
