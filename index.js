const franc = require("franc");
const isoLanguageConverter = require("iso-language-converter");
const winkSentiment = require("wink-sentiment");
const kmeans = require("node-kmeans");
const similarity = require("similarity");
const tokenizer = require("wink-tokenizer");


class Utils {
    constructor() {

    }


    getLanguage(text) {
        return new Promise((resolve, reject) => {
            if (typeof text !== "string")
                return reject("The given text must be a string.");

            let language = isoLanguageConverter(franc(text), { from: 3, to: 1 });
            resolve(language);
        });
    }


    getSentiment(text) {
        return new Promise((resolve, reject) => {
            if (typeof text !== "string")
                return reject("The given text must be a string.");

            let sentiment = winkSentiment(text);
            resolve(sentiment);
        });
    }


    getClusters(data, k, attributes) {
        return new Promise((resolve, reject) => {
            if (typeof data !== "object" || data.length === 0)
                return reject("The given data is not an array of objects.")
            if (typeof k !== "number" || k <= 0)
                return reject("The number of clusters k must be a number (greather than zero)");
            if (typeof attributes !== "object" || attributes.length < 2)
                return reject("The given attributes must be an array with two values");

            let vectors = new Array();
            for (let v = 0; v < data.length; v++) {
                vectors[v] = [data[v][attributes[0]], data[v][attributes[1]]];
            }

            kmeans.clusterize(vectors, { k: k }, (err, res) => {
                if (err)
                    return reject(err);

                resolve(res);
            });
        });
    }


    getSimilarity(text1, text2) {
        return new Promise((resolve, reject) => {
            if (typeof text1 !== "string" || typeof text2 !== "string")
                return reject("Both texts must be strings.")

            resolve(similarity(text1, text2))
        });
    }


    getTokens(text) {
        return new Promise((resolve, reject) => {
            if (typeof text !== "string")
                return reject("The given text must be string.")

            let textTokenizer = tokenizer();
            resolve(textTokenizer.tokenize(text));
        });
    }


}; // End of Class "Utils"


module.exports = new Utils();

