let increase = document.getElementsByClassName("increase");
let decrease = document.getElementsByClassName("decrease");

console.log(increase.length);
console.log(decrease.length);

let hour = document.getElementsByClassName("hour");
let minute = document.getElementsByClassName("minute");
let second = document.getElementsByClassName("second");

for (let button of increase)
{
    button.addEventListener("click", function() {        
        switch(this.id) {
            case "i1":
                hour[0].textContent = ((parseInt(hour[0].textContent) + 1) % 10).toString();
                break;
            case "i2":
                hour[1].textContent = ((parseInt(hour[0].textContent) + 1) % 10).toString();
                break;
            case "i3":
                minute[0].textContent = ((parseInt(minute[0].textContent) + 1) % 10).toString();
                break;
            case "i4":
                minute[1].textContent = ((parseInt(minute[1].textContent) + 1) % 10).toString();
                break;
            case "i5":
                second[0].textContent = ((parseInt(second[0].textContent) + 1) % 10).toString();
                break;
            case "i6":
                second[1].textContent = ((parseInt(second[1].textContent) + 1) % 10).toString();
                break;
        }
    });
}

for (let button of decrease)
{
    button.addEventListener("click", function() {
        switch(this.id) {
            case "d1":
                hour[0].textContent = ((parseInt(hour[0].textContent) + 9) % 10).toString();
                break;
            case "d2":
                hour[1].textContent = ((parseInt(hour[0].textContent) + 9) % 10).toString();
                break;
            case "d3":
                minute[0].textContent = ((parseInt(minute[0].textContent) + 9) % 10).toString();
                break;
            case "d4":
                minute[1].textContent = ((parseInt(minute[1].textContent) + 9) % 10).toString();
                break;
            case "d5":
                second[0].textContent = ((parseInt(second[0].textContent) + 9) % 10).toString();
                break;
            case "d6":
                second[1].textContent = ((parseInt(second[1].textContent) + 9) % 10).toString();
                break;
        }
    });
}

let startingInterval;

document.getElementsByClassName("start-button")[0].addEventListener("click", function() {
    let hours = parseInt(hour[0].textContent) * 10 + parseInt(hour[1].textContent);
    let minutes = parseInt(minute[0].textContent) * 10 + parseInt(minute[1].textContent);
    let seconds = parseInt(second[0].textContent) * 10 + parseInt(second[1].textContent);
    let totalTime = hours * 3600 + minutes * 60 + seconds;
    
    document.getElementsByClassName("stop-button")[0].addEventListener("click", stopFunc);
    document.getElementsByClassName("pause-button")[0].addEventListener("click", pauseFunc);
    
    document.getElementsByClassName("stop-button")[0].style.backgroundColor = "#C354C7";
    document.getElementsByClassName("pause-button")[0].style.backgroundColor = "#C354C7";
    
    startingInterval = setInterval(function() {
        totalTime--;
        
        if (totalTime <= 0) {
            new Audio("alarm.wav").play();
            setTimeout(function() {
                audio.pause();
            }, 5000);
            
            clearInterval(startingInterval);
            document.getElementsByClassName("stop-button")[0].click();
            return;
        }
        
        hours = parseInt(totalTime / 3600);
        totalTime %= 3600;
        minutes = parseInt(totalTime / 60);
        totalTime %= 60;
        seconds = totalTime;
        
        totalTime = hours * 3600 + minutes * 60 + seconds;
        
        hour[1].textContent = (hours % 10).toString();
        hours = parseInt(hours / 10);
        hour[0].textContent = (hours % 10).toString();
        
        minute[1].textContent = (minutes % 10).toString();
        minutes = parseInt(minutes / 10);
        minute[0].textContent = (minutes % 10).toString();
        
        second[1].textContent = (seconds % 10).toString();
        seconds = parseInt(seconds / 10);
        second[0].textContent = (seconds % 10).toString();
        
        hour[0].classList.remove("animated");
        hour[1].classList.remove("animated");
        minute[0].classList.remove("animated");
        minute[1].classList.remove("animated");
        second[0].classList.remove("animated");
        second[1].classList.remove("animated");
       
        changeState(hour, minute, second);
    }, 1000);
});

function changeState(hour, minute, second)
{
    second[1].classList.add("animated");
    if (second[1].textContent !== "0")
        return;
    
    second[0].classList.add("animated");
    if (second[0].textContent !== "0")
        return;
    
    minute[1].classList.add("animated");
    if (minute[1].textContent !== "0")
        return;
    
    minute[0].classList.add("animated");
    if (minute[0].textContent !== "0")
        return;
    
    hour[1].classList.add("animated");
    if (second[1].textContent !== "0")
        return;
    
    hour[0].classList.add("animated");
    if (second[0].textContent !== "0")
        return;
}

let stopFunc = function() {
    clearInterval(startingInterval);
    hour[0].classList.remove("animated");
    hour[1].classList.remove("animated");
    minute[0].classList.remove("animated");
    minute[1].classList.remove("animated");
    second[0].classList.remove("animated");
    second[1].classList.remove("animated");
    
    hour[0].textContent = hour[1].textContent = "0";
    minute[0].textContent = minute[1].textContent = "0";
    second[0].textContent = second[1].textContent = "0";
    
    document.getElementsByClassName("stop-button")[0].removeEventListener("click", stopFunc);
    document.getElementsByClassName("pause-button")[0].removeEventListener("click", pauseFunc);
    
    document.getElementsByClassName("stop-button")[0].style.backgroundColor = "dimgray";
    document.getElementsByClassName("pause-button")[0].style.backgroundColor = "dimgray";
}

let pauseFunc = function() {
    clearInterval(startingInterval);
    hour[0].classList.remove("animated");
    hour[1].classList.remove("animated");
    minute[0].classList.remove("animated");
    minute[1].classList.remove("animated");
    second[0].classList.remove("animated");
    second[1].classList.remove("animated");
    
    document.getElementsByClassName("stop-button")[0].removeEventListener("click", stopFunc);
    document.getElementsByClassName("pause-button")[0].removeEventListener("click", pauseFunc);
    
    document.getElementsByClassName("stop-button")[0].style.backgroundColor = "dimgray";
    document.getElementsByClassName("pause-button")[0].style.backgroundColor = "dimgray";
}
