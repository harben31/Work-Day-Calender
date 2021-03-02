//WHEN the page is loaded
//THEN the current date is dow day month & current, past and future hours are displayed
//WHEN the hour changes over
//THEN the past hours are colored gray, present hour green future hours red
//WHEN the save button icon is clicked
//THEN the text in the main section is saved in local storage and displayed upon page reload



// const today = moment();
let currentHour = moment().format("HH");
// let currentHour = 11;
const currentDay = $("#currentDay");
const schedule = $("#schedule");
const hourOfDay = $(".hourOfDay");
const eventEl = $(".event")
const userInputMtg = $(".userInputMtg");
const saveButton = $(".saveBtn");

const clearBtn = $("#clearBtn");

const timeArray = [];

const storageKeyArray = [];


currentDay.text(moment().format("dddd, MMM Do, YYYY, hh:mm:ss"))


// sortedStorageKeyArray = sortStorageKeyArray()
var timeChange = function(){
    // console.log("ticktiock")
    const timeNow = moment().format("dddd, MMM Do, YYYY, hh:mm:ss");
    currentDay.text(timeNow);
    const timeChange = moment().format("HH");
    currentHour = timeChange;
    // currentHour = moment().format("HH");
    // currentHour++;
    // console.log(currentHour);
}


const renderMtg = function(){
    
    for (let x=0; x<localStorage.length; x++){
        storageKeyArray.push(localStorage.key(x));
    }
    const sorted = storageKeyArray.sort(function(a, b){return a-b});
    console.log(sorted);

    console.log(localStorage);
    // -------------printing locale storage---------------
    for (let i=0; i<userInputMtg.length; i++){
        console.log(i);
        console.log("inputIndex: " + userInputMtg[i].dataset.hour);
        console.log("storageIndex: " + localStorage.key(i));
        console.log(sorted[i]);

            if(localStorage.key(i)===null){
                console.log("break");
                break;
            } else if(userInputMtg[i].dataset.hour===sorted[i]){
                // const key = localStorage.key(i);
                const key = sorted[i];
                const value = localStorage.getItem(key);
                console.log(key);
                // console.log(value);
                userInputMtg[i].innerHTML = value;
                // userInputMtg[i].text.(value);
            }    
    } 
    // console.log(storageKeyArray);
    // console.log(sortedStorageKeyArray);
}

renderMtg();

// console.log(userInputMtg[j].attr("data-hour") <currentHour);
// console.log(userInputMtg[j].attr("data-hour") ===currentHour);
// console.log(userInputMtg[j].attr("data-hour") >currentHour);


// -------------time of day color change-------------
//need to make it change on the hour
for(let j=0; j<userInputMtg.length; j++){
    // console.log(eventEl[j]);
    if (userInputMtg[j].dataset.hour<currentHour){
        $(eventEl[j]).removeClass("future").addClass("past");
    }  else if(userInputMtg[j].dataset.hour>currentHour){
        $(eventEl[j]).removeClass("present").addClass("future");
    } else if(userInputMtg[j].dataset.hour===currentHour){
        $(eventEl[j]).removeClass("past").addClass("present");
    }
    // console.log(userInputMtg[j].dataset.hour <currentHour);
    // console.log(userInputMtg[j].dataset.hour ===currentHour);
    // console.log(userInputMtg[j].dataset.hour >currentHour);

    // console.log(userInputMtg[j].dataset.hour)
    // console.log(currentHour)
}


clearBtn.on("click", function(){
    localStorage.clear();
})



schedule.on("click", "i", function(event){
    // console.log($(event.target).closest(".hourOfDay").find("textarea").val());
    localStorage.setItem(event.target.dataset.hour, $(event.target).closest(".hourOfDay").find("textarea").val());
    
});

setInterval(timeChange, 1000)