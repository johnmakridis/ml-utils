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

  `Language detection: getLanguageSync() or getLanguage()`
  
  `Sentiment detection: getSentimentSync() or getSentiment()`
  
  `Text similarity: getSimilaritySync() or getSimilarity()`

  `Sentence tokenizer: getTokensSync() or getTokens()`

  `k-means clustering: getClusters()`
