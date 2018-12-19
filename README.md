ML-Utils.js (Machine Learning Utils)
=========

A small package that helps developers in machine learning processes

## Installation

  `npm install --save ml-utils.js`

## Usage

    const MLUtils = require('ml-utils.js');
    const mlu = new MLUtils();
    
    const test = mlu.getLanguageSync('Γειά, τι κάνεις; Όλα καλά;');
    console.log(test); // 'el'
  
## Methods

  `getLanguageSync()`
  `getLanguage()`
  `getSentimentSync()`
  `getSentiment()`
  `getSimilaritySync()`
  `getSimilarity()`
  `getTokensSync()`
  `getTokens()`
  `getClusters()`
