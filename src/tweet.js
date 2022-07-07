import { myFunc } from "./app.js";
class Tweet {
  constructor(tweet, hour) {
    this.tweet = tweet;
    this.hour = hour;
  }
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const tweetBtn = document.querySelector(".btn");
const contentText = document.querySelector(".form-control");
const btnDeleteAll = document.querySelector(".confirm");
const divCtn = document.querySelector(".home");
let tweets = [];

// Render Tweets on load
window.addEventListener("load", loadTweet);
function loadTweet() {
  if (localStorage.myTweets) {
    if (!tweets.length) {
      tweets = JSON.parse(localStorage.getItem("myTweets"));
      for (let i = tweets.length - 1; i >= 0; i--) {
        const divCard = document.createElement("div");
        const br = document.createElement("br");
        divCard.classList.add("card");
        divCtn.appendChild(divCard);
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        divCard.appendChild(cardBody);
        divCard.insertAdjacentElement("afterend", br);
        cardBody.innerHTML = tweets[i].tweet + "<br>" + tweets[i].hour;
        updateNumberTweets();
      }
    }
  }
}
tweetBtn.addEventListener("click", tweet);
function tweet() {
  if (contentText.value) {
    const infoDate = {
      hours: new Date().getHours(),
      minutes: function () {
        let minutes = new Date().getMinutes();
        minutes = ("0" + minutes).slice(-2);
        return minutes;
      },
      month: months[new Date().getMonth()],
      day: new Date().getDate(),
      year: new Date().getFullYear(),
      infoDateResult: function () {
        let infoDateResult = `${this.hours}:${this.minutes()} · ${this.month} ${
          this.day
        }, ${this.year}`;
        return infoDateResult;
      },
    };

    tweets.push(new Tweet(contentText.value, infoDate.infoDateResult()));
    localStorage.myTweets = JSON.stringify(tweets);

    contentText.value = "";
    myFunc();
    updateTweets();
    updateNumberTweets();
  }
}

function updateTweets() {
  const hasCard = document.querySelector(".card");
  if (hasCard) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    const br = document.createElement("br");
    document
      .querySelector(".card")
      .insertAdjacentElement("beforebegin", divCard);
    document.querySelector(".card").insertAdjacentElement("afterend", br);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    divCard.appendChild(cardBody);
    cardBody.innerHTML =
      tweets[tweets.length - 1].tweet + "<br>" + tweets[tweets.length - 1].hour;
  } else {
    const timeline = document.querySelector(".tweets-number");
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    const br = document.createElement("br");
    timeline.insertAdjacentElement("afterend", divCard);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    divCard.appendChild(cardBody);
    cardBody.innerHTML =
      tweets[tweets.length - 1].tweet + "<br>" + tweets[tweets.length - 1].hour;
  }
}

function updateNumberTweets() {
  if (localStorage.myTweets) {
    let numberTweets = JSON.parse(localStorage.getItem("myTweets"));
    const tweetsNumbers = document.querySelector(".tweets-number");
    tweetsNumbers.innerHTML =
      numberTweets.length > 1
        ? numberTweets.length + " Tweets"
        : numberTweets.length + " Tweet";
  }
}

btnDeleteAll.addEventListener("click", deleteAll);
function deleteAll() {
  localStorage.removeItem("myTweets");
  window.location.reload();
}
