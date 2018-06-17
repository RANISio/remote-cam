import compression from 'compression';
import { minify } from 'html-minifier';
import express from 'express';
import bodyParser from 'body-parser';
import { sessionParser } from './server/constants';
import api from './server/api';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import Application from './client/Main';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// Workaround for Razzle's assets route issue in terms of static site genearation
var clientCss = assets.client.css,
  clientJs = assets.client.js;

if (process.env.NODE_ENV == 'production') {
  if (clientCss) clientCss = clientCss.replace('/', '');

  clientJs = clientJs.replace('/', '');
}

export default express()
  .disable('x-powered-by')
  .use(compression())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(sessionParser)
  .post('/', api)
  .get('/*', (request, response) => {
    const sheet = new ServerStyleSheet(),
      html = renderToString(sheet.collectStyles(<Application />)),
      css = sheet.getStyleTags();

    response.send(
      minify(
        `<!DOCTYPE HTML>
			<html lang="en">
				<head>
					<title>Remote Camera</title>

					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

					<meta name="description" content="">

					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons">

					` +
          (clientCss
            ? '<link rel="stylesheet" href="' + clientCss + '">'
            : '') +
          css +
          `
					<script defer src="` +
          clientJs +
          `"></script>
				</head>
				<body>
					<div id="root">` +
          html +
          `</div>
				</body>
			</html>`,
        {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      )
    );
  });