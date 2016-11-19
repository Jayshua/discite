/////////////////////////////
// Reference Parser
// ================
// Parses a normally formatted bible reference and returns
// an array of this structure:
//
// [... ranges ...]
// 
// Where `ranges` is a one or two element array consisting of either
// the verse given, or the starting and ending verses of a verse range
// which are themselves the database ids of the verses in question.
//
// The resulting value, for the input `John 3:16-4:10, 1 Samuel 10:19, Genesis 1-2`
// looks like this:
//
// [ [ '430316', '430410' ], [ '091019' ], [ '010101', '010201' ] ]
//
////////////////////////////
var english_bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
var parser = new english_bcv_parser;
var bookId = require("./bookId.js");

/*****************************************/
/* Pads a string with leading characters */
/*****************************************/
var padString = function(str, paddingValue) {
   return String(paddingValue + str).slice(-paddingValue.length);
};

/******************************************************/
/* Converts an OSIS identifier to a database verse id */
/******************************************************/
var OSIStoID = function(osis) {
   osis = osis.split(".");
   var book    = padString(bookId(osis[0]), "00");
   var chapter = padString(osis[1], "000");
   var verse;

   if (osis.length === 2) {
      verse = "999";
   } else {
      verse = padString(osis[2], "000");
   }

   return book + chapter + verse;
};

/**************************************************************************/
/* Returns an array of verse ids corresponding to the requested reference */
/**************************************************************************/
module.exports = function(reference) {
   var osis = parser.parse(reference).osis();

   if (osis.length === 0) {
      return Error("Book not Found");
   }

   return osis.split(",").map(referenceArray => referenceArray.split("-").map(osis => OSIStoID(osis)));
};