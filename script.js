const gearDisplay = document.getElementById("gair")
const buttonbrk = document.getElementById("brkBtn");
const options = document.getElementById("option");
const countDisplay = document.getElementById("clickCount");
const rangedisplay = document.getElementById("range");
const fueldsply = document.getElementById("fuel");
const left_indi_button = document.getElementById("lindicator");
const right_indi_btn = document.getElementById("rindicator");
const circle = document.getElementsByClassName("innerclass")[0];
const circle2 = document.getElementsByClassName("innerclass")[1];
const brklight = document.getElementsByClassName("brk")[0];
const mode = document.getElementById("mode");
const mode1 = document.getElementById("mode1");
const mode2 = document.getElementById("mode2");
const neutral = document.getElementById("new");

let isBlinking = false;
let intervalId;

//Pressure
function myfunction() {
    var x = document.getElementById("psure").value;
    var y = document.getElementById("psure2").value;
    console.log(x);
    if (x == 0 && y == 0) {
        alert("not working with pressure 0...")
    }
}

function battery() {
    const battery = document.getElementById("battery").value;
    // console.log(battery);    
    if (battery <= 24) {
        alert("battery is low..")
    }
}

//drop-down
options.addEventListener("change", () => {
    if (options.value === "neutral") {
        count = 0;
    }
    countDisplay.textContent = count;
    updateGear(count);
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

    //disable reverse and neutral while driving mode
    if (speed > 0 && options.value === "driving") {
        options.querySelector('[value="reverse"]').disabled = true;
        neutral.disabled = true;
    }
    else {
        options.querySelector('[value="reverse"]').disabled = false;
        // options.querySelector('[value="neutral"]').disabled = false;
    }

    //disable driving and neutral while reverse mode
    if (speed > 0 && options.value === "reverse") {
        options.querySelector('[value="driving"]').disabled = true;
        options.querySelector('[value="neutral"]').disabled = true;
    }
    else {
        options.querySelector('[value="driving"]').disabled = false;
        options.querySelector('[value="neutral"]').disabled = false;
    }
    //disable mode 
    if (mode.value === "mode2x2") {
        if (speed > 0) {
            mode2.disabled = true;
        } else {
            mode2.disabled = false;
        }
    }else{
        if (mode.value === "mode4x4") {
            if (speed > 0) {
                mode1.disabled = true;
            } else {
                mode1.disabled = false;
            }
        }
    }

    gearDisplay.textContent = gear;
    return gear;
}

//speed 
const button = document.getElementById("myBtn");

let interval;
let count = 0;

button.addEventListener("mouseover", () => {
    myfunction();
    battery();
    if (options.value === "neutral") return;
    interval = setInterval(() => {
        if (options.value === "reverse") {
            if (count < 10) {
                count++;
            }
        } else {
            if (count < 200) {
                count++;
            }
        }
        countDisplay.textContent = `${count}km`;
        updateGear(count)
    }, 1000)
});

button.addEventListener('mouseout', () => {
    clearInterval(interval);
});

//break button
buttonbrk.addEventListener("mouseover", () => {
    brklight.style.backgroundColor = "red";
    interval = setInterval(() => {
        if (options.value === "neutral") return;
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
    brklight.style.backgroundColor = "white";
});

//range
setInterval(() => {
    const gear = gearDisplay.textContent;
    let range = 0;
    let fuel = 10;
    if (gear === "1st") range = 3 * fuel;
    else if (gear === "2nd") range = 5 * fuel;
    else if (gear === "3rd") range = 7 * fuel;
    else if (gear === "4th") range = 13 * fuel;
    else if (gear === "5th") range = 15 * fuel;
    rangedisplay.textContent = `range: ${range} km`;
}, 3000)

//indicator
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

right_indi_btn.addEventListener("click", function () {
    if (isBlinking) {
        clearInterval(intervalId);
        circle2.classList.remove("blink");
        isBlinking = false;
    } else {
        circle2.classList.add("blink");
        intervalId = setInterval(() => {
            //
        }, 1000);
        isBlinking = true;
    }
});

//hazard light
const light = document.getElementById("hazard");
light.addEventListener("click", () => {
    if (!isBlinking) {
        circle.classList.add('blink');
        circle2.classList.add('blink');
        isBlinking = true;
    } else {
        circle.classList.remove('blink');
        circle2.classList.remove('blink');
        isBlinking = false;
    }
})

// stering 
const stringbtnleft = document.getElementById("sbtnleft");
const stringbtnright = document.getElementById("sbtnright");

stringbtnleft.addEventListener("mouseover", function () {
    setTimeout(() => {
        if (isBlinking) {
            circle.classList.remove('blink');
            // circle2.classList.remove('blink');
        }
    }, 2000);
})

stringbtnright.addEventListener("mouseover", function () {
    setTimeout(() => {
        if (isBlinking) {
            circle2.classList.remove('blink');
        }
    }, 2000)
})

//audio 
const audio = document.getElementById('myAudio');
const playbutton = document.getElementById('playButton');

playbutton.addEventListener('click', () => {
    audio.play();
});

//sitbelt and airbag
const mybtn = document.querySelector(".sitbelt");
const airbag = document.querySelector(".airbag");

function btncolor() {
    if (mybtn.style.backgroundColor == "salmon") {
        mybtn.style.backgroundColor = "white";
        airbag.style.backgroundColor = "white";
    } else {
        mybtn.style.backgroundColor = "salmon";
    }
}

mybtn.addEventListener('click', btncolor);

airbag.addEventListener('click', () => {
    if (mybtn.style.backgroundColor == "salmon") {
        airbag.style.backgroundColor = airbag.style.backgroundColor == "green" ? "white" : "green";
    }
})