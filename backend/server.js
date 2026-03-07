import express from "express";

const app = express();
const port = process.env.PORT || 5533;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

