var connect        = require("connect");
var http           = require("http");
var compression    = require("compression");
var url            = require("url");
var serveStatic    = require("serve-static");
var parseReference = require("./referenceParser");

var knex    = require("knex")({
  client: "mysql",
  connection: {
    host       : "127.0.0.1",
    user       : "discite",
    password   : "discite",
    database   : "discite"
  }
});


var app = connect();
app.use(compression());
app.use(serveStatic("../client", {index: ["index.html"]}));


var respondWithVerse = function(request, response, databaseResponse) {
   console.log(databaseResponse);

   if (databaseResponse.length === 0) {
      response.writeHead(404, {"Content-Type": "application/json"});
      response.end('{error: "Verse not found"}');
   } else {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(databaseResponse));
   }
};

app.use("/api", function(request, response) {
   var queryData = url.parse(request.url, true).query;
   var query = knex.select("text", "id")
                   .from("t_kjv")
                   .limit(30);

   data = parseReference(queryData.reference);

   if (data instanceof Error) {
      response.writeHead(404, {"Content-Type": "application/json"});
      response.end('{error: "Verse not found"}');
   } else {
      data.forEach(function(referenceRange) {
         if (referenceRange.length === 1) {
            query.where("id", referenceRange[0]);
         } else {
            query.whereBetween("id", referenceRange);
         }
      });

      query.then(respondWithVerse.bind(null, request, response));
   }
});


http.createServer(app).listen(3000, function() {
   console.log("Ready.");
});

// knex.select("text").from("bible_kjv").where("id", "01001001").then(function(result) {
//    console.log(result);
// });
