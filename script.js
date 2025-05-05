const gearDisplay = document.getElementById("gair")
const buttonbrk = document.getElementById("brkBtn");
const options = document.getElementById("option")
const countDisplay = document.getElementById("clickCount");
const rangedisplay = document.getElementById("range");
const fueldsply = document.getElementById("fuel");
const left_indi_button = document.getElementById("lindicator");
const right_indi_btn = document.getElementById("rindicator");
const circle = document.getElementsByClassName("innerclass")[0];
const circle2 = document.getElementsByClassName("innerclass")[1];
const pressure = document.getElementById("psure")
const stringbtnleft = document.getElementById("sbtnleft")
const stringbtnright = document.getElementById("sbtnright")
let isBlinking = false;
let intervalId;

options.addEventListener("change", () => {
    if (options.value === "neutral") {
        count = 0;
        countDisplay.textContent = count;
        updateGear(count)
    }
    if (options.value === "reverse") {
        if (count >= 5) {
            count -= 5;
        } else {
            count = 0;
        }
        countDisplay.textContent = count;
        updateGear(count)
    }
    if (options.value === "driving")
        document.getElementById("option").querySelector('[value="reverse"]').disabled = true;
    else {
        document.getElementById("option").querySelector('[value="reverse"]').disabled = false;
    }
})

function updateGear(speed) {
    let gear = "neutral"
    if (options.value === "driving" && speed === 0) gear = "1st"
    else if (speed > 0 && speed <= 10) gear = "1st";
    else if (speed >= 10 && speed <= 15) gear = "2nd";
    else if (speed >= 15 && speed <= 20) gear = "3rd";
    else if (speed >= 20 && speed <= 25) gear = "4th";
    else if (speed >= 20) gear = "5th";
    else if (speed === 0) gear = "Neutral";

    if (options.value === "reverse") gear = "reverse";

    gearDisplay.textContent = gear;
    return gear;
}

//speed 
const button = document.getElementById("myBtn");
let interval;
let count = 0;

button.addEventListener("mouseover", () => {
    if (options.value === "neutral") {
        buttonbrk.removeEventListener("click",null);
    }
    interval = setInterval(() => {
        if (count < 200) {
            count++;
            countDisplay.textContent = `${count}km`;
            updateGear(count)
        }
    }, 1000)
});

button.addEventListener('mouseout', () => {
    clearInterval(interval);
});

//break button
buttonbrk.addEventListener("mouseover", () => {
    interval = setInterval(() => {
        if (options.value === "neutral") {
            buttonbrk.removeEventListener("click");
        }
        let dec = options.value === "reverse" ? 1 : 5;
        if (count >= dec) {
            count -= dec;
        } else {
            count = 0;
        }
        countDisplay.textContent = `${count}km`;
        updateGear(count)
    }, 1000)
});

buttonbrk.addEventListener('mouseout', () => {
    clearInterval(interval);
});

//range
setInterval(() => {
    const gear = gearDisplay.textContent;
    let range=0;
    let fuel = 10;
    if (gear === "1st")  range = 3*fuel;
    else if (gear === "2nd") range = 5*fuel;
    else if (gear === "3rd") range = 7*fuel;
    else if (gear === "4th") range = 13*fuel;
    else if (gear === "5th") range = 15*fuel;
    rangedisplay.textContent = `range: ${range} kmpl`;
}, 3000)  

left_indi_button.addEventListener("click", function () {
    if (isBlinking) {
        clearInterval(intervalId);
        circle.classList.remove("blink");
        isBlinking = false;
    } else {
        circle.classList.add("blink");
        intervalId = setInterval(() => {
           //
        }, 1000);
        isBlinking = true;
    }
});

right_indi_btn.addEventListener("click",()=> {
    if (isBlinking) {
        clearInterval(intervalId);
        circle2.classList.remove("blink");
        isBlinking = false;
    } else {
        circle2.classList.add("blink");
        setTimeout(()=>{
            isBlinking = true;
        },4000)
    }
});

stringbtnleft.addEventListener("mouseover",function (){
    if (isBlinking) {
        circle.classList.remove('blink');
        circle2.classList.remove('blink');
    }
})

stringbtnright.addEventListener("mouseover",()=>{
    if (isBlinking) {
        circle2.classList.remove('blink');
    }
})

// 2 var left right -indicator
// 2 circle -blink
// 2 stering -left right - 4sec thi vdhare hoy to off kri devanu

// battery-car nhi chle 
// tyre -25 psi thi ochu- give alert  front 
//     -35 psi thi ochu- give alert rear wheel pressure 
// seat belt on airbag on 
// sensor-5sec thi vdhare car accident open airbag 