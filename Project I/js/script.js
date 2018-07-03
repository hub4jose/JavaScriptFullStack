

// array of object literals
var quotes = [  {quote: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
                source: "J.K. Rowling", citation: "Harry Potter and the Goblet of Fire", year: "2005"},

                {quote: "Always forgive your enemies; nothing annoys them so much", source: "Oscar Wilde", citation: "", year: ""},

                {quote: "I am so clever that sometimes I don't understand a single word of what I am saying.", source: "Oscar Wilde",
                citation: "The Happy Prince and Other Stories", year: ""},

                {quote: "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.",
                source: "Steve Jobs", citation: "", year: ""},

                {quote: "Doing the best at this moment puts you in the best place for the next moment.", source: "Oprah Winfrey",
                  citation: "", year: ""}
              ];

// event listener to respond to "Show another quote" button clicks
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//on Internal of 7 seconds printQuote function is called
setInterval(printQuote,7000);

// when user clicks anywhere on the button, the "printQuote" function is called
function printQuote(){
// calls and stores random number
  var ramdomPick = parseInt(getRandomQuote());

  //changes background color
  document.body.style.background = "RGB(" + getRandomColor() + "," + getRandomColor() + "," + getRandomColor() + ")";
  //varible to hold the Citation of a quote if available
  var htmlCitation = "";

  //variable to hold the year of a quote if available
  var htmlYear = "";
// constructs  span element if citation property is present in the object
  if(quotes[ramdomPick].citation != "") {
    htmlCitation = '<span class="citation">' +  quotes[ramdomPick].citation + '</span>';
  }

  // constructs span element if year property is present in the object
 if(quotes[ramdomPick].year != "") {
        htmlYear = '<span class="year">' +  quotes[ramdomPick].year + '</span>';
  }

// variable to construct the html code required inside of div element
  var html =
  '<p class="quote">' + quotes[ramdomPick].quote +  '</p>' +
  '<p class="source">' + quotes[ramdomPick].source +
    htmlCitation +
    htmlYear +
  '</p>';

// puts constructed html code inside the div with id = 'quote-box'
  document.getElementById('quote-box').innerHTML = html;

}

// function generates random number between 0 to 4 as we have only 5 quotes to pick in the quotes Array
function getRandomQuote(){
return Math.floor(Math.random() * 5);

}
// generates random numbers for the rgb color
function getRandomColor(){
  return Math.floor(Math.random() * 256);
}
