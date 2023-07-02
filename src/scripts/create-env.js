const fs = require('fs-extra');

fs.outputFile('./src/environments/environment.ts', `export const environment = {
  production: true,
  WEATHER_API_KEY: "${process.env.WEATHER_API_KEY}",
  WEATHER_API_BASEURL: "${process.env.WEATHER_API_BASEURL}"
};`);
