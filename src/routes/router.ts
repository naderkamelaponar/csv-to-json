import { promises as fsPromise } from "fs";
import csv from "csvtojson";
const csvFile = "./users.csv";
const jsonFile = "./users.json";

const convert = () => {
  csv()
    .fromFile(csvFile)
    .then((data) => {
      let jsonData = data.map(
        (i: { first_name: string; last_name: string; phone: string }) => {
          let firstName = i.first_name;
          let lastName = i.last_name;
          let phone = i.phone;
          if (phone == "") {
            phone = "ms data";
          }
          return { firstName, lastName, phone };
        }
      );
      fsPromise.writeFile(jsonFile, JSON.stringify(jsonData), { flag: "w" });
      return jsonData;
    });
};

export default convert;
