var verseInput = require("./verseInput");
var request    = require("xr");

var referenceInput = document.querySelector("#referenceInput"); // The input used to get the verse reference
var submitButton   = document.querySelector("#submitButton");   // The button used to load the verse


/***************************************************/
/* Fetches a verse and put it into the verse input */
/***************************************************/
var fetchVerse = function() {
   request.get("/api", {reference: referenceInput.value}).then(function(response) {
      var verse = response.reduce(function(verseText, verse) {
         return verseText += " " + verse.text;
      }, "");

      verseInput.set(verse);
   });
};


referenceInput.addEventListener("keydown", function(event) {
   if (event.keyCode === 13)
      referenceInput.blur();
});

referenceInput.addEventListener("blur", fetchVerse);

referenceInput.focus();