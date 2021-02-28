//WHEN the page is loaded
//THEN the current date is dow day month & current, past and future hours are displayed
//WHEN the hour changes over
//THEN the past hours are colored gray, present hour green future hours red
//WHEN the save button icon is clicked
//THEN the text in the main section is saved in local storage and displayed upon page reload
//


const currentDay = $("#currentDay");
const hourOfDay = $(".hourOfDay");
const userInputMtg = $(".userInputMtg");
const today = moment();
const currentHour = today.format("HH");
currentDay.text(today.format("dddd, MMM Do, YYYY"));

// if (hourOfDay.attr("data-hour")<currentHour.toString()){
if (hourOfDay.attr("data-hour")<currentHour){
    userInputMtg.attr("class", "bg-danger");
    console.log("hour of day");
}



console.log(hourOfDay.attr("data-hour"));
console.log(currentHour.toString());