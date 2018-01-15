import express from 'express';
import path from 'path';

import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import applyMiddleware from './middleware';

import App from './client/components/App';

const app = express();

applyMiddleware(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  const context = {};

  const initialState = {};

  const initialView = renderToString((
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  ));

  if (context.url) {
    res.redirect(context.url, context.status);
  } else {
    if (context.status) {
      res.status(context.status);
    }

    res.render('index', { initialView, initialState });
  }
});

export default app;
