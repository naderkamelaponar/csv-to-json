import express from "express";
import { promises as fsPromise } from "fs";
import csv from "csvtojson";
import fileExists from "file-exists";
const app = express();
const port = 3000;
const csvFile = "./users.csv";
const jsonFile = "./users.json";
// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
app.get("/convert", (req, res) => {
  convert();
  res.send("converted");
});
const convert = () => {
  csv()
    .fromFile(csvFile)
    .then((data) => {
      let jsonObj = data.map(
        (i: { first_name: string; last_name: string; phone: string }) => {
          let firstName = i.first_name;
          let lastName = i.last_name;
          let phone = i.phone;
          if (phone == "") {
            phone = "missing data";
          }
          return { firstName, lastName, phone };
        }
      );
      fsPromise.writeFile(jsonFile, JSON.stringify(jsonObj), { flag: "w+" });
    });
};
