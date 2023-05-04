const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
// app.get("/api", (req, res) => {
//     res.json({"users":["userOne","userTwo","userThree"]})
// })

app.listen(port, () => {console.log(`Server started on port ${port}`)})