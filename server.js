const express = require('express');
const app = express();

const port = 3333;

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});