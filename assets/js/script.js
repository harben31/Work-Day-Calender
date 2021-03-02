//DONE
//WHEN the save button icon is clicked
//THEN the text in the main section is saved in local storage and displayed upon page reload
//WHEN the page is loaded
//THEN the current date is dow day month & current, past and future hours are displayed

//TODO
//WHEN the hour changes over
//THEN the past hours are colored gray, present hour green future hours red



// const today = moment();
let currentHour = moment().format("HH");
// let currentHour = 11;
const currentDay = $("#currentDay");
const schedule = $("#schedule");
const hourOfDay = $(".hourOfDay");
//let vs const
let eventEl = $(".event")
const userInputMtg = $(".userInputMtg");
const saveButton = $(".saveBtn");

const clearBtn = $("#clearBtn");

const timeArray = [];

const storageKeyArray = [];


currentDay.text(moment().format("dddd, MMM Do, YYYY, hh:mm:ss a"))

for(let j=0; j<userInputMtg.length; j++){
    // console.log(eventEl[j]);
    if (userInputMtg[j].dataset.hour<currentHour){
        $(eventEl[j]).removeClass("future").addClass("past");
    }  else if(userInputMtg[j].dataset.hour>currentHour){
        $(eventEl[j]).removeClass("present").addClass("future");
    } else if(userInputMtg[j].dataset.hour===currentHour){
        $(eventEl[j]).removeClass("past").addClass("present");
    }
}


// sortedStorageKeyArray = sortStorageKeyArray()
var timeChange = function(){
    //jumbotron time
    const timeNow = moment().format("dddd, MMM Do, YYYY, hh:mm:ss a");
    currentDay.text(timeNow);

    //hours of the day
    const timeChange = moment().format("HH");
    currentHour = timeChange;
    // currentHour++;

    //checking the time and changing color. too heavy to loop every second?

    //didn't work. scope?
    for(let j=0; j<userInputMtg.length; j++){
        // console.log(eventEl[j]);
        if (userInputMtg[j].dataset.hour<currentHour){
            $(eventEl[j]).removeClass("future").addClass("past");
        }  else if(userInputMtg[j].dataset.hour>currentHour){
            $(eventEl[j]).removeClass("present").addClass("future");
        } else if(userInputMtg[j].dataset.hour===currentHour){
            $(eventEl[j]).removeClass("past").addClass("present");
        }
    }
}

//-----fetching and rendering localestorage
const renderMtg = function(){
    //pushing keys to array and sorting them 
    for (let x=0; x<localStorage.length; x++){
        storageKeyArray.push(localStorage.key(x));
    }

    const sorted = storageKeyArray.sort(function(a, b){return a-b});
    console.log(sorted);

    // -------------printing locale storage---------------
    for (let y=0; y<sorted[y]; y++ ){
        for (let i=0; i<userInputMtg.length; i++){
                if(userInputMtg[i].dataset.hour===sorted[y]){
                // const key = localStorage.key(i);
                const key = sorted[y];
                const value = localStorage.getItem(key);
                console.log(key);
                // console.log(value);
                userInputMtg[i].innerHTML = value;
            }    
        } 
    }
}



//     for (let i=0; i<userInputMtg.length; i++){
//         // console.log(i);
//         // console.log("inputIndex: " + userInputMtg[i].dataset.hour);
//         // console.log("storageIndex: " + localStorage.key(i));
//         // console.log(sorted[i]);

        
//             if(localStorage.key(i)===null){
//                 console.log("break");
//                 break;
//             //if sorted[i] has less than all hours and they are not connected 
//             //it looks at index 0 and it matches, cool do some code
//             //index 1 is 12 am cuz nothing else on the docket so i for user in pur and sorted is different
            
//             //can i fill in blank stuff in to keep the keys all the same 
//             //or can i compare the keys to the dataset 
//             } else if(userInputMtg[i].dataset.hour===sorted[i]){
//             // const key = localStorage.key(i);
//             const key = sorted[i];
//             const value = localStorage.getItem(key);
//             console.log(key);
//             // console.log(value);
//             userInputMtg[i].innerHTML = value;
//             // userInputMtg[i].text.(value);
//         }    
//     } 
// }

clearBtn.on("click", function(){
    localStorage.clear();
    for(let z=0; z<userInputMtg.length; z++){
        userInputMtg[z].innerHTML = "";
    }    
});

schedule.on("click", "i", function(event){
    // console.log($(event.target).closest(".hourOfDay").find("textarea").val());
    localStorage.setItem(event.target.dataset.hour, $(event.target).closest(".hourOfDay").find("textarea").val());
    
});

renderMtg();

setInterval(timeChange, 1000);