// index.js
'use strict';
import Express from 'express';

const isProd = process.env.NODE_ENV === 'production';
const WEB_PORT = process.env.PORT || 3000;
const expressStaticRoutes = [
    {path: '/fonts/', serverPath: '/../client/fonts'},
    {path: '/img/', serverPath: '/../client/img'},
    {path: '/css/', serverPath: '/../client/css'},
    {path: '/js/', serverPath: '/../client/js'},
];
const renderApp = `
    <!doctype html>
    <html>
        <head>
            <title>pbplus-member-ui-demo</title>
        </head>
        <body>
            <div id="app-root"></div>
            <script type='text/javascript' src="${isProd ? `/js/bundle.js` : `http://localhost:7000/js/bundle.js`}" ></script>
        </body>
    </html>
`;
const app = Express();

app.get('/', (req, res) => { res.send(renderApp); })
app.get('/:arg', (req, res) => { res.send(renderApp); })
expressStaticRoutes.forEach(function(route) {
    app.use(route.path, Express.static(__dirname + route.serverPath));
});
app.listen(WEB_PORT);
