/* Global Variables */
let apiKey = "&appid=d6e952ec3cadf94b66ac78b4d0d4b9e0";
let baseURL = "http://api.openweathermap.org/data/2.5/forecast?id="
const generate = document.getElementById("generate");
const feelings = document.getElementById("feelings").value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
let temp = 0;

//async function that uses GET method to make a request to openweathermap API
const getWeather = async (url , zip , key)=>{
  const request = await fetch(url + zip + key);
  try {
    // Transform data received into JSON
    const data = await request.json()
    temp = data.list[0].main.temp;
  } catch(error) {
    console.log("error", error);
  }
}
//POST function
const postWeather = async (url, data = {})=>{
  const response = await fetch(url,{
    method :"POST" ,
    credentials : "same-origin",
    headers : {
      "content-type" : "application/json",
    },
    body : JSON.stringify(data),
  })
  try {
    const newData = await response.json();
           return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
};
// take an action when the button with "generate" text is clicked
generate.addEventListener("click" , clickAction)

function clickAction(e){
  const zipCode = document.getElementById("zip").value;
  //chain promises
  getWeather (baseURL, zipCode , apiKey)

  .then(function(){
postWeather('/addData' , {temp : temp , date : newDate , userResponse : document.getElementById("feelings").value})
  })
  .then(updateUI())
}
//making the UI dynamic (changes its values with user inputs)
const updateUI = async () =>{
 const request = await fetch('/all');

 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData);
 // Write updated data to DOM elements
 document.getElementById('content').innerHTML = allData.userResponse;
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
 document.getElementById('date').innerHTML =allData.date;
 }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
 }}
