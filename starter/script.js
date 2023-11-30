//LOCATION
//search for city with ID search-input
//var location = document.getElementById('search-input').value;
var myAPI = "b6867985438cc4e09e88f61f11f39225" ;
//var location;

function getCurrentWeather(location){
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + myAPI;

    console.log(apiURL);
    
    
    fetch(apiURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data){
        console.log(data);
    
         // City name
    console.log("City Input/ Data fetch : " + data.name);
var city = data.name ;
var cityEl = document.getElementById('cityName');
cityEl.textContent = city; 

        //I need to retrieve the key value pairings from the above json
       // var results = data.LOCATION.OF.DATA
    
    //temperature
    var temp = Math.floor(data.main.temp - 273.15);
    //list temperature
    var tempEl = document.getElementById('currentTemp')
    tempEl.textContent = temp;

    // Humidity 
    var humidity = data.main.humidity ;
    var humidityEl = document.getElementById('currentHumid');
    humidityEl.textContent = humidity ;

    //Windspeed

    var wind = data.wind.speed;
    var windEl = document.getElementById("currentWind");
windEl.textContent = wind ;
console.log("WINDSPEED: " + wind);


//weather Icon
    var weatherImageCode = data.weather[0].icon;
    var weatherImageURL= "http://openweathermap.org/img/w/" + weatherImageCode + ".png";
    
    // weatherImageEl.textContent = weatherImage;
    console.log("Icon Code : " + weatherImageCode);
//target weather icon and ammend the src
    $('#wicon').attr('src', weatherImageURL);

});

}



function get5DayForecast(location){
    var apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + myAPI;

    console.log(apiURL);
    
    
    fetch(apiURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data){
        console.log(data);
    
        //I need to retrieve the key value pairings from the above json
        var date = data.list[0].dt_txt ;
        console.log("DATE: "+date);
        //var results = data.response;
    
        function findDate(arr) {
            var result = [];
            for (var i = 7; i < arr.length; i += 8) {
    if (arr[i] && arr[i].dt_txt) {
                result.push(arr[i].dt_txt); // Pushing the date string into the result array
            }
            }
            return result;
            console.log(result);
    }
        var every8thDate = findDate(data.list);
        console.log("Every 8th date:", every8thDate);

// display Date
//day 1
// var dateDisplay = every8thDate[0] ;
// var dateEl = document.getElementById('date1');
// dateEl.textContent = dateDisplay;
// //day2
// var dateDisplay = every8thDate[1] ;
// var dateEl = document.getElementById('date2');
// dateEl.textContent = dateDisplay;
// //day3
// var dateDisplay = every8thDate[2] ;
// var dateEl = document.getElementById('date3');
// dateEl.textContent = dateDisplay;
// //day4 
// var dateDisplay = every8thDate[3] ;
// var dateEl = document.getElementById('date4');
// dateEl.textContent = dateDisplay;
// //day5
// var dateDisplay = every8thDate[4] ;
// var dateEl = document.getElementById('date5');
// dateEl.textContent = dateDisplay;

//OR
for (var i = 0 ; i<5; i++){
    var dateDisplay = every8thDate[i] ;
var dateEl = document.getElementById('date'+(i+1));
dateEl.textContent = dateDisplay;
}

//temperature
var futuretemp= Math.floor(data.list[7].main.temp-273.15);
console.log("FUTURE TEMP:::" + futuretemp);

function findFutureTemperatures(arr) {
    var temperatures = [];
for (var i = 7; i < arr.length; i += 8) {
    if (arr[i] && arr[i].main && arr[i].main.temp) {
        temperatures.push(Math.floor(arr[i].main.temp - 273.15));
    }
    }
    return temperatures;
}
//display the temp in the ID
function displayTemperatures() {
    var futureTemperatures = findFutureTemperatures(data.list);
for (var i = 0; i < futureTemperatures.length; i++) {
    var tempEl = document.getElementById('temp' + (i + 1));
        tempEl.textContent = futureTemperatures[i] + 'C'; // Adding Celsius unit
    
    }
}
  // Call the displayTemperatures function after fetching the data
displayTemperatures();

// humidity 
function findFutureHumidity (arr){
var humidity =[];
//for loop to iterate through 
for(var i = 7; i < arr.length; i+=8){
//select what we are searching for
if(arr[i] && arr[i].main && arr[i].main.humidity){
    //push into the empty array to access later^
    humidity.push(arr[i].main.humidity);
}}
console.log("FUTURE Humidity: " + humidity);
return humidity;
}

// now display humidity in html
function displayHumidity (){
    var futureHumidity = findFutureHumidity(data.list);
    for (var i = 0; i < futureHumidity.length; i++){
        var humidEl = document.getElementById('futureHumid' + (i +1));
humidEl.textContent = futureHumidity[i];

}
}
displayHumidity();

// windSPEED
var wind = data.list[7].wind.speed
function findFutureWind (arr){
    var wind =[];
    //for loop to iterate through 
    for(var i = 7; i < arr.length; i+=8){
    //select what we are searching for
    if (arr[i] && arr[i].wind && arr[i].wind.speed) {
        wind.push(arr[i].wind.speed);
        //push into the empty array to access later^
    
    }}
    console.log("FUTURE wind SPEED: " + wind);
    return wind;

    }
    function displayWind (){
        var futureWind = findFutureWind(data.list);
        for (var i = 0; i < futureWind.length; i++){
            var windEl = document.getElementById('futureWind' + (i +1));
    windEl.textContent = futureWind[i];
}
}
displayWind();

// future icon
var icon = data.list[7].weather[0].icon ;
console.log("Future Icon: "+ icon);

// now for every 8thDay
function findFutureIcons (arr){
    var futureIcons =[];
    //for loop to iterate through 
    for(var i = 7; i < arr.length; i+=8){
    //select what we are searching for
    if(arr[i] && arr[i].weather[0] && arr[i].weather[0].icon){
        //push into the empty array to access later^
        futureIcons.push(arr[i].weather[0].icon);
    }}
    console.log("FUTURE Icon: " + futureIcons);
    return futureIcons;
    }

    function displayFutureImages() {
        var futureIMG = findFutureIcons(data.list);
        console.log(futureIMG); //futureIMG is the codes
        for (var i = 0; i < futureIMG.length; i++) {
            var weatherImageURL = "http://openweathermap.org/img/w/" + futureIMG[i] + ".png";
    
            // Set the src attribute of the image element within each icon container
            var iconID = 'icon' + (i + 1);
            var imgElement = document.querySelector('#' + iconID + ' img');
            if (imgElement) {
                imgElement.src = weatherImageURL;
            }
        
        }
    }
    
    displayFutureImages();
// var icon =
// function findFutureIcons(arr) {
//     var icons = [];
//     for (var i = 7; i < arr.length; i += 8) {
//         if (arr[i] && arr[i].weather && arr[i].weather[0] && arr[i].weather[0].icon) {
//             icons.push(arr[i].weather[0].icon);
//         }
//     }
//     console.log("FUTURE icons: ", icons);
//     return icons;
// }
// var generateFuture =  data.list[7].weather.icon;
// var generateFutureURL= "http://openweathermap.org/img/w/" + generateFuture + ".png";
// $('#wicon').attr('src', generateFutureURL);


});
    }

//serach button ======
$("#search-button").on("click", function(event){
    event.preventDefault();
    console.log("Button Clicked!");
var location = $('#search-input').val();
console.log(location);


//calling the functions 
getCurrentWeather(location);
get5DayForecast(location);



//id history 


});








// next append html elements - where can i put it on my page