const axios = require('axios');

const fastApiBaseURL = process.env.FASTAPI_URL || 'http://localhost:8000';

const fastApiRecommendationsClient = axios.create({
  baseURL: fastApiBaseURL + '/recommend',
  timeout: 15000, // optional: set request timeout
});

const fastApiPersonalizeClient = axios.create({
    baseURL: fastApiBaseURL + '/personalize',
    timeout: 15000, // optional: set request timeout
    });

module.exports = {
    fastApiRecommendationsClient,
    fastApiPersonalizeClient
};