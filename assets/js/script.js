
let currentHour = moment().format("HH");
const currentDay = $("#currentDay");
const schedule = $("#schedule");
const hourOfDay = $(".hourOfDay");
const eventEl = $(".event")
const userInputMtg = $(".userInputMtg");
const saveButton = $(".saveBtn");

const clearBtn = $("#clearBtn");

const storageKeyArray = [];

currentDay.text(moment().format("dddd, MMM Do, YYYY, hh:mm:ss a"))

for(let j=0; j<userInputMtg.length; j++){
    let currentHourString = currentHour.toString();
    if (userInputMtg[j].dataset.hour<currentHour){
        $(eventEl[j]).removeClass("future").addClass("past");
    }  else if(userInputMtg[j].dataset.hour>currentHour){
        $(eventEl[j]).removeClass("present").addClass("future");
    } else if(userInputMtg[j].dataset.hour===currentHour){
        $(eventEl[j]).removeClass("past").addClass("present");
    }
}

var timeChange = function(){
    //jumbotron time
    const timeNow = moment().format("dddd, MMM Do, YYYY, hh:mm:ss a");
    currentDay.text(timeNow);
}

// -----getting and rendering localestorage----------  
const renderMtg = function(){
    //pushing keys to array and sorting them 
    for (let x=0; x<localStorage.length; x++){
        storageKeyArray.push(localStorage.key(x));
    }

    const sorted = storageKeyArray.sort(function(a, b){return a-b});

    // -------------printing locale storage---------------
    for (let y=0; y<sorted.length; y++ ){
               for (let i=0; i<userInputMtg.length; i++){
                if(userInputMtg[i].dataset.hour===sorted[y]){
                const key = sorted[y];
                const value = localStorage.getItem(key);
                userInputMtg[i].innerHTML = value;
            }    
        } 
    }
}

clearBtn.on("click", function(){
    localStorage.clear();
    for(let i=0; i<userInputMtg.length; i++){
        userInputMtg[i].innerHTML = "";
    }    
});

schedule.on("click", "i", function(event){
    localStorage.setItem(event.target.dataset.hour, $(event.target).closest(".hourOfDay").find("textarea").val());
});

renderMtg();

setInterval(timeChange, 1000);