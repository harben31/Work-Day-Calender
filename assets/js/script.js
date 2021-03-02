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
// const currentHour = today.format("HH");
const currentHour = 11;
const saveButton = $(".saveBtn");
const schedule = $("#schedule");
const eventEl = $(".event")

const timeArray = []

currentDay.text(today.format("dddd, MMM Do, YYYY"));


// const renderMtg = function(){
//     if(localStorage.getItem())

// }
for (i=0; i<userInputMtg.length; i++){
    console.log(i);
    console.log(userInputMtg[i].dataset.hour);
    console.log(localStorage.key(i));
        if(localStorage.key(i)===null){
            console.log("break")
            break
        } else if(userInputMtg[i].dataset.hour===localStorage.key(i)){
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(key);
            console.log(value);
            userInputMtg[i].innerHTML = value;
            // userInputMtg[i].text.(value);
        }
            
} 

// console.log(userInputMtg[j].attr("data-hour") <currentHour);
// console.log(userInputMtg[j].attr("data-hour") ===currentHour);
// console.log(userInputMtg[j].attr("data-hour") >currentHour);

for(let j=0; j<userInputMtg.length; j++){
    console.log(eventEl[j]);
    if (userInputMtg[j].dataset.hour<currentHour){
        $(eventEl[j]).removeClass("future").addClass("past");
    }  else if(userInputMtg[j].dataset.hour>currentHour){
        $(eventEl[j]).removeClass("present").addClass("future");
    } else if(userInputMtg[j].dataset.hour===currentHour){
        $(eventEl[j]).removeClass("past").addClass("present");
    }
    console.log(userInputMtg[j].dataset.hour <currentHour);
    console.log(userInputMtg[j].dataset.hour ===currentHour);
    console.log(userInputMtg[j].dataset.hour >currentHour);

    console.log(userInputMtg[j].dataset.hour)
    console.log(currentHour)
}





schedule.on("click", "i", function(event){
    // console.log($(event.target).closest(".hourOfDay").find("textarea").val());
    localStorage.setItem(event.target.dataset.hour, $(event.target).closest(".hourOfDay").find("textarea").val());
    
});