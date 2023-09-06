import franc from 'franc';
import * as kmeans from 'node-kmeans';
import similarity from 'similarity';
import Tokenizer from 'wink-tokenizer';

const winkSentiment = require('wink-sentiment');
const isoLanguageConverter = require('iso-language-converter');



export class MLUtils {


    // Language detection
    getLanguageSync(text: string) {

        if (typeof text !== 'string')
            throw new Error('The given text must be a string.');

        const language = isoLanguageConverter(franc(text), { from: 3, to: 1 });
        return language;

    }



    // Language detection (asynchronous)
    async getLanguage(text: string): Promise<string> {

        return new Promise((resolve, reject) => {

            if (typeof text !== 'string')
                return reject('The given text must be a string.');

            const language = isoLanguageConverter(franc(text), { from: 3, to: 1 });

            resolve(language);

        });

    }



    // Sentiment Detection
    getSentimentSync(text: string): { score: number; normalizedScore: number; tokenizedPhrase: { value: string; tag: string; }[]; } {

        if (typeof text !== 'string')
            throw new Error('The given text must be a string.');

        const sentiment = winkSentiment(text);
        return sentiment;

    }



    // Sentiment Detection (asynchronous)
    async getSentiment(text: string): Promise<{ score: number; normalizedScore: number; tokenizedPhrase: { value: string; tag: string; }[]; }> {

        return new Promise((resolve, reject) => {

            if (typeof text !== 'string')
                return reject('The given text must be a string.');

            const sentiment = winkSentiment(text);
            resolve(sentiment);

        });

    }



    // Text similarity
    getSimilaritySync(text1: string, text2: string): number {
        if (typeof text1 !== 'string' || typeof text2 !== 'string')
            throw new Error('Both texts must be strings.');

        return similarity(text1, text2);
    }



    // Text similarity (asynchronous)
    async getSimilarity(text1: string, text2: string): Promise<number> {

        return new Promise((resolve, reject) => {

            if (typeof text1 !== 'string' || typeof text2 !== 'string')
                return reject('Both texts must be strings.')

            resolve(similarity(text1, text2))

        });

    }



    // Sentence tokenizer
    getTokensSync(text: string): { value: string; tag: string; }[] {

        if (typeof text !== 'string')
            throw new Error('The given text must be string.');

        const textTokenizer = new Tokenizer();
        return textTokenizer.tokenize(text);

    }



    // Sentence tokenizer (asynchronous)
    async getTokens(text: string): Promise<{ value: string; tag: string; }[]> {
        return new Promise((resolve, reject) => {

            if (typeof text !== 'string')
                return reject('The given text must be string.')

            const textTokenizer = new Tokenizer();
            resolve(textTokenizer.tokenize(text));

        });
    }



    // k-means clustering (asynchronous)
    async getClusters(data: any[], k: number, attributes?: string[]): Promise<[{ centroid: number[]; cluster: [][]; clusterInd: number[]; }]> {
        return new Promise((resolve, reject) => {
            if (typeof data !== 'object' || data.length === 0)
                return reject('The given data is not an array of objects.')
            if (typeof k !== 'number' || k <= 0)
                return reject('The number of clusters k must be a number (greather than zero)');
            if (typeof attributes !== 'object' || attributes.length < 2)
                return reject('The given attributes must be an array with two values');

            const vectors = new Array();

            for (let v = 0; v < data.length; v++) {
                vectors[v] = [data[v][attributes[0]], data[v][attributes[1]]];
            }

            kmeans.clusterize(vectors, { k: k }, (err: any, res: any) => {
                if (err)
                    return reject(err);

                resolve(res);

            });

        });

    }

}; // End of Class 'Utils'
