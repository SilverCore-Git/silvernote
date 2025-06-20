const express = require('express');
const path = require('path');
const morgan = require('morgane');

const app = express();

app.use(morgan());
app.use(express.static(path.join(__dirname, "dist")));

app.listen(8080, () => {
    console.log('Server start on port : 8080');
})
