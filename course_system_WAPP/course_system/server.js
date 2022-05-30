let express = require("express");
let app = express();
app.get("/fruits", (req, res, next) => {
    res.json(["Banana","Apple","Kiwi"]);
    });
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});