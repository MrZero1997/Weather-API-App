/* Global Variables */
const apiKey = ",&appid=d6e952ec3cadf94b66ac78b4d0d4b9e0&units=imperial";
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip="
const generate = document.getElementById("generate");
const server = "http://127.0.0.1:8080";

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+1 +'.'+ date.getDate()+'.'+ date.getFullYear();

//async function that uses GET method to make a request to openweathermap API
const getWeather = async (url , zip , key)=>{
  const request = await fetch(url + zip + key);
  try {
    // Transform data received into JSON
    const allData = await request.json();
    return allData;
    // appropriately handle the error
  } catch(error) {
    console.log("error", error);
  }
}
//POST function
const postWeather = async (url= "", data = {})=>{
  const response = await fetch(url,{
    method :"POST" ,
    credentials : "same-origin",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(data),
  });
  try{
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);

  }
};
//making the UI dynamic (changes its values with user inputs)
 const updateUI = async () =>{
 const request = await fetch('/all');

 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData);
 // Write updated data to DOM elements
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
 document.getElementById('date').innerHTML =allData.date;
 document.getElementById('content').innerHTML = allData.userResponse;
 }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
 }}
// take an action when the button with "generate" text is clicked
generate.addEventListener("click" , clickAction)

 function clickAction(e){
  const zipCode = document.getElementById("zip").value;

  //chain promises
 getWeather (baseURL, zipCode , apiKey).then((allData) =>{
   console.log(allData);
  const temp = allData.list[0].main.temp;
  const data = {temp : temp , date : newDate , userResponse : document.getElementById("feelings").value};
  postWeather('/addData' , data)
  console.log(data);
  updateUI();
})
};
