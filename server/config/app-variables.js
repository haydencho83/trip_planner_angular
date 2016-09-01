'use strict';

var path = require('path');
var logMiddleware = require('volleyball');

var rootPath = path.join(__dirname, '../../');
var indexPath = path.join(rootPath, './browser/index.html');
var faviconPath = path.join(rootPath, './public/favicon.ico');


module.exports = function (app) {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);
};
