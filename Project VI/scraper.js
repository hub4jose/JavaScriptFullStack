"use strict";

const request = require('request'); // node module for HTTP Request
const cheerio = require('cheerio'); // node module for scrapping
const fs = require('fs'); //node module for file system
const converter = require('json-2-csv');//node module to convert json to csv file format

const url = "http://shirts4mike.com";


// http request http://shirts4mike.com
request(url, function (error, response, body) {

  //for request which are OK and errorless http://shirts4mike.com
     if(!error && response.statusCode === 200){

         //use cheerio module to replicate jquery on the respose body
          let $ = cheerio.load(body);

          //URL to scrape the shirts information
          const shirtsUrl = url + '/' + $("a[href='shirts.php']").attr('href');

          // http request http://shirts4mike.com/shirts.php
          request(shirtsUrl, function (error, response, body) {

            //for request which are OK and errorless http://shirts4mike.com/shirts.php
            if(!error && response.statusCode === 200){
                 //use cheerio module to replicate jquery on the respose body
                 let $ = cheerio.load(body);
                 //array to store each shirt url
                 let arrUrl = [];
                 //array to store each shirt objets
                 let arrShirt =[];
                 //folder for csv file
                 let folder = "./data";
                 //column header for the csv file data
                 let header = ["Title", "Price", "ImageURL", "URL", "Time"];
                 //extract all the links to the shirt in the body into an array
                 $("a[href*='shirt.php?id=']").each(function(){
                   let shirtPath = url + '/' + $(this).attr('href');
                   if(arrUrl.indexOf(shirtPath) === -1){
                     arrUrl.push(shirtPath);
                   }
                 });

                 for (var i = 0; i < arrUrl.length; i++) {

        							//http request for each shirt
        							request(arrUrl[i], function(error, response, body) {

        								if (!error && response.statusCode == 200) {

        									let $ = cheerio.load(body);

        									//object to store the info scraped from each shirt link visited
        									let shirts = {}

        									shirts.Title = '"' + $('title').text() + '"';
        									shirts.Price = $('.price').text();
        									shirts.ImageURL = $('.shirt-picture img').attr('src');
        									shirts.URL = response.request.href;

        									const dte = new Date();
        									shirts.Time = dte;

        									//Array to store the shirts objects
        									arrShirt.push(shirts);


        									if(!fs.existsSync(folder)) {
        										fs.mkdirSync(folder);
        									};


        									let dd = dte.getDate();
        									let mm = dte.getMonth() + 1 ;
        									let yyyy = dte.getFullYear();
                          //fileName as today's date
        									let fileName = yyyy + "-" + dd + "-" + mm + ".csv";

        									// json-2-csv node module to convert json to csv file
        									converter.json2csv(arrShirt, function(err, csv) {

          										if (err) throw err;

          										fs.writeFile(folder + "/" + fileName, csv, function(err) {
          											if (err) throw err;
          												console.log(fileName + ' created');
          										});

        									});

        								} else {
        									logError(error);
        								} //end of each shirt request

        							});

                  }
                } else {
                  logError(error);
                }//end of shirts.php visit

             });

           }else {
             logError(error);
           }//end of http://shirts4mike.com visit

  });


  function logError(error) {
  	console.log('Error occured while scrapping site ' + url);
  	var errorMsg = "[" + Date() + "]" + " : " + error + "\n";
  	fs.appendFile("scraper-error.log", errorMsg, function(err) {
  		if (err) throw err;
  		console.log('Error was logged into "scraper-error.log" file');
  	});
  }
