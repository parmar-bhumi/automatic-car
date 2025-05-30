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
const brklight = document.getElementsByClassName("brk")[0];
const averageDisplay = document.getElementById("average");
// const leverButton = document.getElementById("myBtn");
// const rpmDisplay = document.getElementById("rpm");



const oilInput = document.getElementById("oilInput");
const oilLevelDisplay = document.getElementById("oilLevelDisplay");
const tempDisplay = document.getElementById("temperatureDisplay");
const alertDisplay = document.getElementById("temperatureAlert");


const rpm = document.getElementById("rpmDisplay");
// const rpmMaxDisplay = document.getElementById("rpmMaxDisplay");



let isBlinking = false;
let intervalId;
let pressureEffect = 0;


//drop-down
options.addEventListener("change", () => {
    if (options.value === "neutral") {
        count = 0;
    }
    countDisplay.textContent = count;
    updateGear(count);

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
    if (options.value === "neutral") return;
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
    brklight.style.backgroundColor = "red";
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

//wheel 
const wheel = document.getElementById("wheel");
const psi = document.getElementById("psure");

wheel.addEventListener("click", () => {
    if (count > 25) {
        alert("psi exceded...");
    } else {
        count++;
        psi.textContent = `Pressure w-1 & 2 - ${count}`;
    }
})

const wheel2 = document.getElementById("wheel2");
const psi2 = document.getElementById("psure2");

wheel2.addEventListener("click", () => {
    if (count >= 35) {
        alert("pressure exceded...")
    } else {
        count++;
        psi2.textContent = `Pressure w-1 & 2 - ${count}`;
    }
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

const mode = document.getElementById("mode2")
let avg;
let mod;
if (avg = 6) {
    mod = avg / 2;
    mode.textContent = `Mode 4/4 :  ${mod}`;
}

// RPM

let currentRpm = 0;
let leverUp;
let rpmInterval;
let decayInterval;


const rpmDisplay = document.getElementById("rpm");
const rpmMaxDisplay = document.getElementById("rpmMaxDisplay");
// const averageDisplay = document.getElementById("average");
const leverButton = document.getElementById("myBtn");

function updateRPMDisplay(rpmValue) {
    rpmDisplay.textContent = `RPM: ${rpmValue}`;

    if (rpmValue >= 10.5) {
        rpmMaxDisplay.textContent = "Max RPM";
        rpmMaxDisplay.classList.add("blink");
    } else {
        rpmMaxDisplay.textContent = "";
        rpmMaxDisplay.classList.remove("blink");
    }
    // averageDisplay.textContent = "average: --"; 
    let average = "-";
    if (rpmValue >= 1 && rpmValue <= 3) {
        average = "5 km/l";
    } else if (rpmValue >= 4 && rpmValue <= 7) {
        average = "15 km/l";
    } else if (rpmValue > 7 && rpmValue <= 9) {
        average = "13 km/l";
    } else if (rpmValue > 9) {
        average = "3 km/l";
    }

    if (average !== "-") {
        average += pressureEffect;

        // Optional: Prevent average from going below 0
        if (average < 0) average = 0;

        averageDisplay.textContent = `Average: ${average} km/l`;
    } else {
        averageDisplay.textContent = `Average: -`;
    }


    averageDisplay.textContent = `Average: ${average}`;
}

leverButton.addEventListener("mouseover", () => {
    leverUp = Date.now();

    rpmInterval = setInterval(() => {
        const elapsed = (Date.now() - leverUp) / 1000;
        let rpmValue = currentRpm;

        if (elapsed >= 1 && elapsed < 2 && currentRpm < 1) rpmValue = 1;
else if (elapsed >= 2 && elapsed < 3 && currentRpm < 2) rpmValue = 2;
else if (elapsed >= 3 && elapsed < 4 && currentRpm < 3) rpmValue = 3;
else if (elapsed >= 4 && elapsed < 5 && currentRpm < 4) rpmValue = 4;
else if (elapsed >= 5 && elapsed < 6 && currentRpm < 5) rpmValue = 5;
else if (elapsed >= 6 && elapsed < 7 && currentRpm < 6) rpmValue = 6;
else if (elapsed >= 7 && elapsed < 8 && currentRpm < 7) rpmValue = 7;
else if (elapsed >= 8 && elapsed < 9 && currentRpm < 8) rpmValue = 8;
else if (elapsed >= 9 && elapsed < 10 && currentRpm < 9) rpmValue = 9;
else if (elapsed >= 10 && elapsed < 11 && currentRpm < 10) rpmValue = 10;
else if (elapsed >= 11 && elapsed < 12 && currentRpm < 11) rpmValue = 11;
else if (elapsed >= 12 && elapsed < 13 && currentRpm < 12) rpmValue = 12;

        if (rpmValue !== currentRpm) {
            currentRpm = rpmValue;
            updateRPMDisplay(currentRpm);
        }
    }, 500);
});

leverButton.addEventListener("mouseout", () => {
    clearInterval(rpmInterval);

    decayInterval = setInterval(() => {
        if (currentRpm > 1) {
            currentRpm -= 1;
            if (currentRpm < 1) currentRpm = 1;
            updateRPMDisplay(currentRpm);
        } else {
            clearInterval(decayInterval);
        }
    }, 1000);
});

// Oil


oilInput.addEventListener("input", () => {
    let oilValue = parseFloat(oilInput.value);

    // Limit input to 10 max
    if (oilValue > 10) {
        oilValue = 10;
        oilInput.value = 10;
    }

    oilLevelDisplay.classList.remove("blink-red");

    // Alert condition for low oil
    if (oilValue <= 7) {
        alert("Engine oil low");
        oilLevelDisplay.classList.add("blink-red");
        oilLevelDisplay.textContent = `Oil Level: ${oilValue}L - Low`;
    } else {
        oilLevelDisplay.textContent = `Oil Level: ${oilValue}L`;
    }
});

// Temp....

tempInput.addEventListener("input", checkTemperature);

function checkTemperature() {
    const temp = parseFloat(document.getElementById("tempInput").value);


    tempDisplay.textContent = `Temperature: ${temp}°C`;


    if (isNaN(temp)) {
        alertDisplay.textContent = "enter temp.";
        alertDisplay.style.color = "black";
        return;
    }

    if (temp < 10 || temp > 70) {
        alertDisplay.textContent = "10-70";

    } else if (temp < 15) {
        alertDisplay.textContent = "Low Temperature";

    } else if (temp >= 60) {
        alertDisplay.textContent = "High Temperature";

    } else {
        alertDisplay.textContent = " Normal.";

    }
}

// Radiator

function checkRadiatorWater() {
    const water = parseFloat(document.getElementById("rediatorInput").value);
    const display = document.getElementById("rediatorDisplay");

    if (isNaN(water)) {
        display.textContent = "Radiator Water Level: -";
        return;
    }

    display.textContent = ` Water Level: ${water}L`;

    if (water < 5) {
        showTopAlert(" Low water level", "low");
    }
}

// Front/Rear Pressure

let frontPressureEffect = 0;
    let rearPressureEffect = 0;
    const baseAverage = 15; 

    const frontPressureInput = document.getElementById('frontPressureInput');
    const rearPressureInput = document.getElementById('rearPressureInput');

    frontPressureInput.addEventListener('input', () => {
      const value = parseFloat(frontPressureInput.value);
      frontPressureEffect = 0;

      if (value >= 23 && value <= 27) {
        frontPressureEffect = 1;
      } else if (value > 27) {
        alert('front - high pressure');
        frontPressureEffect = -2;
      } else if (value < 23) {
        alert('front - low pressure');
        frontPressureEffect = -3;
      }

      document.getElementById("frontPressureDisplay").textContent = `${value} PSI`;
      updatePressureEffect();
    });

    rearPressureInput.addEventListener('input', () => {
      const value = parseFloat(rearPressureInput.value);
      rearPressureEffect = 0;

      if (value >= 27 && value <= 33) {
        rearPressureEffect = 1;
      } else if (value > 33) {
        alert('rear - high pressure');
        rearPressureEffect = -2;
      } else if (value < 27) {
        alert('rear - low pressure');
        rearPressureEffect = -3;
      }

      document.getElementById("rearPressureDisplay").textContent = `${value} PSI`;
      updatePressureEffect();
    });

    function updatePressureEffect() {
      const totalEffect = frontPressureEffect + rearPressureEffect;
      const finalAverage = baseAverage + totalEffect;
      document.getElementById("averageDisplay").textContent = `${finalAverage} km/l`;
      console.log(`Total Effect: ${totalEffect}, Final Average: ${finalAverage}`);
    }


    // auto temp....







    




// distance............................


const TYRE_CIRCUMFERENCE_METERS = 2.3156;
const ROTATIONS_PER_MIN = 432;

let totalTimeInMinutes = 0;
let distanceKm = 0;
let lastDistance = 0;
let previousSpeed = 0;

const distanceDisplay = document.getElementById("distanceDisplay");
const lastDistanceDisplay = document.getElementById("lastDistanceDisplay"); // Add this element in HTML

function calculateDistanceKm(rotationsPerMin, timeInMinutes, tyreCircumference = TYRE_CIRCUMFERENCE_METERS) {
    const totalRotations = rotationsPerMin * timeInMinutes;
    const distanceInMeters = totalRotations * tyreCircumference;
    return distanceInMeters / 1000;
}

// Interval to simulate driving every 6 seconds
setInterval(() => {
    const currentSpeed = count;

    if (currentSpeed === 0 && previousSpeed !== 0) {
        // Show last distance when speed becomes 0
        lastDistance = distanceKm;
        lastDistanceDisplay.textContent = `Last Distance Covered: ${lastDistance.toFixed(2)} km`;
        totalTimeInMinutes = 0; // reset time
        distanceKm = 0; // reset ongoing distance
    } else if (currentSpeed > 0) {
        totalTimeInMinutes += 0.1;
        distanceKm = calculateDistanceKm(ROTATIONS_PER_MIN, totalTimeInMinutes);
        distanceDisplay.textContent = `Distance: ${distanceKm.toFixed(2)} km`;
    }

    previousSpeed = currentSpeed;
}, 6000);









// battery-car nhi chle
// tyre -25 psi thi ochu- give alert  front
//     -35 psi thi ochu- give alert rear wheel pressure
// seat belt on airbag on
// sensor-5sec thi vdhare car accident open airbag
// mode 


