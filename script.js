function delay(callback, timeout) {
    return new Promise(function(resolve, error) {
        setTimeout(() => {
            try {
                callback();
                resolve();
            } catch(e) {
                error(e);
            }
        }, timeout);
    });
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function formatDate() {
    let date = new Date();
    date.setDate(date.getDate() + 5);
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

function checkMoney() {
    output.innerHTML += "<p>[1/5] Cash check ...</p>";
    if (money.value > 3000) {
        output.innerHTML += "<p>Enough money!</p>";
    } else { 
        throw '<p>Not enough money!</p>';
    }
}

function checkName() {
    output.innerHTML += "<p>[2/5] Checking if you are on the guest list ...</p>";
    if (!listGuest.find(element => element == lastName.value)) {
        throw "<p>Oops, you're not on the guest list!</p>";
    }
    output.innerHTML += "<p>Yes, you are on the guest list!</p>";
}

function checkFreePlace() {
    output.innerHTML += "<p>[3/5] Check if there are still free tickets ...</p>";
    if (freePlace > 0) {
        output.innerHTML += "<p>There are still tickets!</p>";
    } else { 
        throw '<p>All tickets are sold out!</p>';
    }            
}

function checkBuyTicket() {
    output.innerHTML += "<p>[4/5] Buying tickets ...</p>";
    if (freePlace > 0) {
        output.innerHTML += "<p>Ticket successfully purchased!</p> <p>Ticket number №" + (randomTicket + 1) + " - " + date.value + " - " + time.value +  " - " + lastName.value + " " + name.value + "</p>";
    } else { 
        throw "<p>Ticket purchase error!</p>";
    }
}

function sendByMail() {
    output.innerHTML += "<p>[5/5] We send it to your email...</p>";
    if (validateEmail(email.value)) {
        output.innerHTML += "<p>Your ticket has been sent to your email: " + email.value + "</p>";
    } else { 
        throw "<p>Failed to send ticket!</p>";
    }       
}

const form = document.forms[0];
let lastName = form.lastName;
let name = form.name;
let email = form.email;
let money = form.money;
let date = form.date;
let time = form.time;

let button = document.querySelector("#btn");

let output = document.querySelector("#output-text");

let listGuest = ["Oleinichenko", "Kedov", "Prohor", "Kononenko", "Apakayev", "Soshnikov"];
let freePlace = 7;
randomTicket = Math.floor(Math.random() * freePlace);
console.log(randomTicket + 1);

date.value = formatDate();

button.addEventListener("click", function() {
    event.preventDefault();
    output.innerHTML = "";
    delay(checkMoney, 2000)
    .then(function() { return delay(checkName, 2000); })
    .then(function() { return delay(checkFreePlace, 2000); })
    .then(function() { return delay(checkBuyTicket, 2000); })
    .then(function() { return delay(sendByMail, 2000); })
    .then(function() { output.innerHTML += "<p>[Completed] The operation was successful!</p> <p>Thank you for buying a ticket!</p>";})
    .catch((error) => { output.innerHTML += error;})
    .finally(() => { output.innerHTML += "<p>Have a nice day!</p>"; });
});