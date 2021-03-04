
let currentHour = moment().format("HH");
// let currentHour = "09";
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
       // console.log(eventEl[j]);
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
    
    // currentHour++;

    // //checking the time and changing color. too heavy to loop every second?
    // //didn't work. scope?
    // //Not scope. I don't think. I think that it is changing the class but
    // //the page is not refreshing so the change won't render. I think. 
    // //nope cuz it works when i increment a fake hour
    // //when I input the fake hour the current class does not work but the other class do change
    // //fake hour is still wierd but has to do with type
    // for(let j=0; j<userInputMtg.length; j++){
    //     // console.log(eventEl[j]);
    //     if (userInputMtg[j].dataset.hour<currentHour){
    //         $(eventEl[j]).removeClass("future").addClass("past");
    //     } else if (userInputMtg[j].dataset.hour===currentHour){
    //         $(eventEl[j]).removeClass("past").addClass("present");
    //     } else if (userInputMtg[j].dataset.hour>currentHour){
    //         $(eventEl[j]).removeClass("present").addClass("future");
    //     }; 
    // };
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