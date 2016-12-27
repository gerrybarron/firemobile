var arrayDevice=[], aryHum=[], aryTemp=[], aryGas=[], aryLat=[], aryLong=[], markers=[],aryLoc=[],aryTstamp=[],userID=[],userDname=[],userName=[],userUname=[],userPname=[],userInfo=[],userEmail=[],userCnum=[],userGender=[],userDob=[],userAddress=[];
var ctx = document.getElementById("myChart");
var ctx2 = document.getElementById("myChart2");
var marker, i, vicon, mydate, myChart, myChart2, directionsDisplay, directionsService, start = "", end = "", request, latlong, contentString;
var color = Chart.helpers.color;
var chartColors = window.chartColors;

$(document).ready(function()
{ 
  getDeviceStatus(); //Get Status from Dweet.io   
  //getUserStatus();
  getChartData(); //Get and Display Chart Data
    for (i = 0; i < aryHum.length; i++) { 
      $("#weather_report").append('<tr><td>'+aryHum[i]+'%'+'</td><td>'+aryTemp[i]+'°C'+'</td><td>'+aryGas[i]+'</td><td>'+aryTstamp[i]+'</td></tr>');
    }
});

setInterval(function(){
  $('#txtChange').fadeOut(500, function() {
        var $this = $(this);
        $this.text($this.text() == 'Gerry\'s Home' ? '29°C Mostly Cloudy' : 'Gerry\'s Home');        
        $this.toggleClass('first second');        
        $this.fadeIn(500);
    });
}, 3000);

function getDeviceStatus(){//Start of getDeviceStatus function
    $.ajax({
        type: "GET",
        url: "https://dweet.io:443/get/dweets/for/gerrybarrontest1",
        async: false,
        success: function(myData){
          console.log(myData);
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

//Get Users Information
function getUserStatus(){//Start of getUserStatus function
    $.ajax({
        type: "GET",
        url: "http://localhost/firefinal/api.php",
        async: false,
        success: function(userData){
            console.log(userData);
            for(var i=0; i<=userData.length-1; i++){
            userID.push(userData[i].userID);
            userDname.push(userData[i].userDname);
            userName.push(userData[i].userName);
            userUname.push(userData[i].userUname);
            userPname.push(userData[i].userPname);
            userEmail.push(userData[i].userEmail);
            userCnum.push(userData[i].userCnum);
            userAddress.push(userData[i].userAddress);
            userGender.push(userData[i].userGender);
            userDob.push(userData[i].userDob);
            arycount = userData.length;
          }
        }
    }); //end of ajax function
    console.log(arycount);
}//End of getUserStatus function

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

function initMap() {//start of initMap function
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru,
    mapTypeId:google.maps.MapTypeId.ROADMAP

  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}//end of initMap function
