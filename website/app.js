/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const ApiKey = "&APPID=2a6d8bf9b2f6cc7c4df6763fcc95ae65";
const unit = "&units=metric";
let zip;
let feelings;


document.getElementById('generate').addEventListener('click', performAction)

function performAction(e) {
    zip = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;



    if(zip.length === 0 || feelings.length == 0) {
        alert("Please enter validated input");
    }

    GET(url, zip, ApiKey, unit)
//add data
    .then(function(data) {
      //post data
        POST('/r', {date: newDate,
          temperature: data.main.temp ,
            country: data.sys.country,
            city: data.name,
          feelings: feelings})
    })
    .then(function() {
        updateUI();
    })
};
const GET = async(url, zip, ApiKey, unit) => {
   const res = await fetch(url + zip + ApiKey + unit);

  try{
    const data = await res.json();
    return data
  }catch(err){
    //handle error
    console.log("error", err);
  }
}

const POST = async ( url = '', data = {}) => {
    const res = await fetch(url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
    });
  try{
    const weatherD  =await res.json();
    return weatherD

  }catch(err){
    //handle error
    console.log("error", err);
  }
}
const updateUI = async () => {
  const req = await fetch('/s')
  try{
    const WData = await req.json()
    console.log(WData.date);
    document.getElementById('date').innerHTML = "Current Date is : " + WData.date;
    document.getElementById('temp').innerHTML = "The temperature in "+ WData.country +", "+ WData.city+" is " + WData.temperature;
    document.getElementById('content').innerHTML ="It gives you a " + WData.feelings + " feel.";



  }catch(err){
    //handle error
    console.log("error", err);
  }
 }
