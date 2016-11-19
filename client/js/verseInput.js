var verseInput     = document.querySelector("#verseInput");
var verseOverlay   = document.querySelector("#verseOverlay");
var wrapper        = document.querySelector("#wrapper");
var mistakeCounter = document.querySelector("#mistakeCounter");
var showOverlay    = document.querySelector("#showOverlay");


var countdown = (function() {
   var count = 0;

   setInterval(function() {
      count += 200;

      if (count > 1500 || showOverlay.checked === true) {
         verseOverlay.classList.add("visible");
      } else {
         verseOverlay.classList.remove("visible");
      }
   }, 200);

   return {
      reset: function() {
         count = 0;
      }
   }
}());

var mistakes = (function() {
   var mistakeCount = 0;

   var render = function() {
      mistakeCounter.innerText = mistakeCount;
   };

   return {
      increment: () => {mistakeCount += 1; render()},
      reset:     () => {mistakeCount  = 0; render()},
      get:       () => mistakeCount
   }
}());


var last = false;
verseInput.addEventListener("keypress", function(evt) {
   var keyPressed = String.fromCharCode(evt.keyCode);
   if (evt.keyCode === 13) keyPressed = "\n";

   evt.preventDefault();
   evt.stopPropagation();

   if (verseOverlay.innerText.indexOf((verseInput.value + keyPressed)) === 0) {
      verseInput.value += keyPressed;
      last = false;
   } else {
      if (!last) {
         mistakes.increment();
         last = true;
      }
   }

   if (mistakes.get() > 1) {
      // verseInput.value = "";
      // mistakes.reset();
      // let backCount = 0;

      // let step = function() {
      //    backCount += 1;

      //    if (backCount < 10)
      //       setTimeout(step, 20);

      //    verseInput.value = verseInput.value.slice(0, -1);
      // }

      // step();
   }

   if (verseInput.value == verseOverlay.innerText && verseOverlay.innerText !== "") {
      wrapper.classList.add("success");
      verseInput.value = "";
      mistakes.reset();
      setTimeout(function() {
         wrapper.classList.remove("success");
         countdown.reset();
      }, 5);
   }

   countdown.reset();
});

var calculatePosition = function() {
   verseInput.style.height = verseOverlay.getBoundingClientRect().height + "px";
   verseOverlay.style.left = verseInput.getBoundingClientRect().left     + "px";
   verseOverlay.style.top  = verseInput.getBoundingClientRect().top      + "px";
};

var set = function(value) {
   verseInput.value = "";
   verseOverlay.innerText = value;

   calculatePosition();
   calculatePosition();

   mistakes.reset();
   
   verseInput.focus();
};


module.exports = {
   set: set
};
