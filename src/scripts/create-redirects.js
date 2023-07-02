const fs = require('fs-extra');

fs.outputFile('../../dist/dg-ng-weather-app/_redirects', `/api/* http://api.weatherapi.com/v1/:splat 200!`);
