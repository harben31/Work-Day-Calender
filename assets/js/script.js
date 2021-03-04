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
// let currentHour = "09";
const currentDay = $("#currentDay");
const schedule = $("#schedule");
const hourOfDay = $(".hourOfDay");
//let vs const
let eventEl = $(".event")
const userInputMtg = $(".userInputMtg");
const saveButton = $(".saveBtn");

const clearBtn = $("#clearBtn");

// const timeArray = [];

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
    // console.log(currentHour.toString());
    // console.log(userInputMtg[j].dataset.hour);
}

// var interval = setInterval(hourUpdater, 15000);


// for(let j=0; j<userInputMtg.length; j++){
//     // console.log(eventEl[j]);
//     let currentHourTwo = moment().hour().toString();
//     // console.log(currentHourTwo);
//     if (userInputMtg[j].dataset.hour<currentHourTwo){
//         $(eventEl[j]).removeClass("future").addClass("past");
//     }  else if(userInputMtg[j].dataset.hour>currentHourTwo){
//         $(eventEl[j]).removeClass("present").addClass("future");
//     } else if(userInputMtg[j].dataset.hour===currentHourTwo){
//         $(eventEl[j]).removeClass("past").addClass("present");
//     }
//     // console.log(currentHour.toString());
//     // console.log(userInputMtg[j].dataset.hour);
// }


// sortedStorageKeyArray = sortStorageKeyArray()
var timeChange = function(){
    //jumbotron time
    const timeNow = moment().format("dddd, MMM Do, YYYY, hh:mm:ss a");
    currentDay.text(timeNow);
    
    // currentHour++;

    // for(let j=0; j<userInputMtg.length; j++){
    //     // console.log(eventEl[j]);
    //     let currentHourTwo = moment().hour().toString();
    //     // console.log(currentHourTwo);
    //     if (userInputMtg[j].dataset.hour<currentHourTwo){
    //         $(eventEl[j]).removeClass("future").addClass("past");
    //     }  else if(userInputMtg[j].dataset.hour>currentHourTwo){
    //         $(eventEl[j]).removeClass("present").addClass("future");
    //     } else if(userInputMtg[j].dataset.hour===currentHourTwo){
    //         $(eventEl[j]).removeClass("past").addClass("present");
    //     }
    //     // console.log(currentHour.toString());
    //     // console.log(userInputMtg[j].dataset.hour);
    // }

    //checking the time and changing color. too heavy to loop every second?
    //didn't work. scope?
    //Not scope. I don't think. I think that it is changing the class but
    //the page is not refreshing so the change won't render. I think. 
    //nope cuz it works when i increment a fake hour
    //when I input the fake hour the current class does not work but the other class do change
    //fake hour is still wierd but has to do with type
    for(let j=0; j<userInputMtg.length; j++){
        // console.log(eventEl[j]);
        if (userInputMtg[j].dataset.hour<currentHour){
            $(eventEl[j]).removeClass("future").addClass("past");
        } else if (userInputMtg[j].dataset.hour===currentHour){
            $(eventEl[j]).removeClass("past").addClass("present");
        } else if (userInputMtg[j].dataset.hour>currentHour){
            $(eventEl[j]).removeClass("present").addClass("future");
        }; 
        // console.log("currentHour " + currentHour);
        // console.log("dataHour " + userInputMtg[j].dataset.hour);
        // console.log("===currenthour ");
        // console.log(userInputMtg[j].dataset.hour===currentHour);
        // console.log(">currentHour ");
        // console.log(userInputMtg[j].dataset.hour>currentHour);
        // console.log("<currentHour " );
        // console.log(userInputMtg[j].dataset.hour<currentHour);

    };
}

//-----fetching and rendering localestorage
const renderMtg = function(){
    //pushing keys to array and sorting them 
    for (let x=0; x<localStorage.length; x++){
        storageKeyArray.push(localStorage.key(x));
    }

    //still not 100% on how this works. how are the params taken in?
    const sorted = storageKeyArray.sort(function(a, b){return a-b});
    // console.log(sorted);

    // -------------printing locale storage---------------
    //iterating over keys inlocalestorage
    for (let y=0; y<sorted.length; y++ ){
        // console.log(sorted[y]);
        // iterating over elements with class of userInputMtg and comparing their data-hour value to the value at index y of sorted. Evrytime outer loop iterates inner loop compares each element to the current value of the sorted array
        for (let i=0; i<userInputMtg.length; i++){
                if(userInputMtg[i].dataset.hour===sorted[y]){
                // const key = localStorage.key(i);
                const key = sorted[y];
                const value = localStorage.getItem(key);
                // console.log(key);
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
    //variables for onetime thing?
    localStorage.setItem(event.target.dataset.hour, $(event.target).closest(".hourOfDay").find("textarea").val());
    
});

renderMtg();

setInterval(timeChange, 1000);