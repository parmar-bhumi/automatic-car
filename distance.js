
// Distance (in km) = (Number of Rotations × Tyre Circumference in meters) / 1000

// Distance (in km) = (432 × 2.3156) / 1000

// 1.3392 

// 432 * 1.66

// (4320 * 2.3156)/1000

// constantSpeedCar = 10,5,2.5,
// constantSpeedCar = 

// time in sec = 3600, speed = 10 km
// time in sec = 600, speed = 1 km
// time in sec = 60, speed = 100 m
// time in sec = 6, speed = 10 m
// time in sec = 1, speed = 1.66 m




const TYRE_CIRCUMFERENCE_METERS = 2.3156; 
const ROTATIONS_PER_MIN = 432;            



function distance(rotationsPerMin, timeInMinutes, tyreCircumference = 2.3156) {
    const totalRotations = rotationsPerMin * timeInMinutes;
    const distanceInMeters = totalRotations * tyreCircumference;
    return distanceInMeters / 1000; 
}

let totalTimeInMinutes = 0;
let distanceKm = 0;
let rotationsPerMin = 432; 

setInterval(() => {
    totalTimeInMinutes += 0.1; 
    distanceKm = calculateDistanceKm(rotationsPerMin, totalTimeInMinutes);
    document.getElementById("distanceDisplay").textContent = distanceKm.toFixed(2) + " km";
}, 6000); 

function calculateDistanceFromSpeed(speedInMps, timeInSec) {
    const distanceMeters = speedInMps * timeInSec;
    return distanceMeters / 1000; 
}





// temp...


function RpmDisplay(rpmValue) {
    rpmdisplay.textContent =` RPM: ${rpmValue}`;

    // Start or stop temp increase based on RPM range
    if (rpmValue >= 1 && rpmValue <= 5) tempaUpdate();
    else stopTemprature();

    if (rpmValue > 5 && rpmValue <= 8) {
        if (Temp2sec) return;
        Temp2sec = setTimeout(() => {
            currentTemp++;
            if (currentTemp > 70) currentTemp = 70;
            document.getElementById("tempInput").value = currentTemp;
            checkTemperature();
        }, 2000);
    } else {
       clearTimeout(Temp2sec);
Temp2sec = null;
    }

    if (rpmValue > 8 && rpmValue <= 12) {
        if (Temp1sec) return;
        Temp1sec = setTimeout(() => {
            currentTemp++;
            if (currentTemp > 70) currentTemp = 70;
            document.getElementById("tempInput").value = currentTemp;
            checkTemperature();
        }, 1000);
    } else {
       clearTimeout(Temp1sec);
Temp1sec = null;
    }
    if (rpmValue >= 10.5) {
        rpmMaxDisplay.textContent = "Max RPM";
        rpmMaxDisplay.classList.add("blink");
    } else {
        rpmMaxDisplay.textContent = "";
        rpmMaxDisplay.classList.remove("blink");
    }

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
        if (average < 0) average = 0;
        averageDisplay.textContent =`Average: ${average}`;
    } else {
        averageDisplay.textContent = Average;
    }
    averageDisplay.textContent = `Average: ${average}`;
}

leverButton.addEventListener("mouseover", () => {
    leverUp = Date.now();

    rpmInterval = setInterval(() => {
        const elapsed = (Date.now() - leverUp) / 1000;
        let rpmValue = currentRpm;

        if (elapsed >= 1 && elapsed < 3 && currentRpm < 4) rpmValue = 2;
        else if (elapsed >= 5 && elapsed < 7 && currentRpm < 5) rpmValue = 4;
        else if (elapsed >= 9 && elapsed < 10 && currentRpm < 9) rpmValue = 6;
        else if (elapsed >= 10 && elapsed < 11 && currentRpm < 10) rpmValue = 8;
        else if (elapsed >= 11 && elapsed < 12 && currentRpm < 10.5) rpmValue = 10.5;
        else if (elapsed >= 12 && elapsed < 14 && currentRpm < 11) rpmValue = 11;
        else if (elapsed >= 15 && currentRpm < 12) rpmValue = 12;

        if (rpmValue !== currentRpm) {
            currentRpm = rpmValue;
            RpmDisplay(currentRpm);
        }
    }, 500);
})

leverButton.addEventListener("mouseout", () => {
    setTimeout(() => {  
        if (tempaUpdate) currentTemp-=5;
    }, 4000);

    clearInterval(rpmInterval);

    decayInterval = setInterval(() => {
        if (currentRpm > 1) {
            currentRpm -= 1;
            if (currentRpm < 1) currentRpm = 1;
            RpmDisplay(currentRpm);
        } else {
            clearInterval(decayInterval);
        }
    }, 1000);
});

//Temperature
const temp = document.getElementById("tempInput").value;
const alertDisplay = document.getElementById("temperatureAlert");

function checkTemperature() {
    const temp = parseFloat(document.getElementById("tempInput").value);
    tempDisplay.textContent = `Temperature: ${temp}`;

    if (isNaN(temp)) {
        alertDisplay.textContent = "enter temp.";
        alertDisplay.style.color = "black";
        return;
    }

    if (temp < 10 || temp > 70) {
        alertDisplay.textContent = "10-70";
    } else if (temp < 15) {
        alertDisplay.textContent = "Low Temperature";
    } else if (temp >= 70) {
        document.body.style.backgroundColor = "red"
    } else if (temp >= 60) {
        alertDisplay.textContent = "High Temperature";
        document.body.style.backgroundColor = "white";
    } else {
        alertDisplay.textContent = " Normal.";
        document.body.style.backgroundColor = "white";
    }
}

