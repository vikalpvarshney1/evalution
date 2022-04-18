const express = require("express");
const PORT = 8000;
const user = require('./user.json')



let app = express();
function logger(req, res, next) {
    console.log(`calling ${req.method} to ${req.url}`);
    try {
        next();
    }
    catch (e) {
        res.status(503).send("internal server error")
    }
    console.log(`called ${req.method} to ${req.url}`);
}
app.use(logger)
app.use(express.json())




app.get("/books", (req, res) => {
    // res.send("hello")
    res.json(user)
})
app.get("/lib", (req, res) => {
    let { libraries } = req.query;

    // http://localhost:8000/lib?libraries=delhi
    if (libraries ) {
        const d = user.find((d) => d.libraries === libraries);
        console.log({ d });
        res.json(d || {})
    }

    else {
        res.json({
            request_from: req.url,
            data: user,
        })
    }
})

app.get("/auth", (req, res) => {
    let {  authors }=req.query;
   
    // http://localhost:8000/auth?authors=vikalp
    if (authors){
        const d = user.find((d) => d.authors === authors);
        console.log({ d });
        res.json(d ||{})
    }

    else{
    res.json({
        request_from: req.url,
        data: user,
    })
}
})


app.post("/user", [logger, express.json()], (req, res) => {
   //
    user.push(req.body)
  
    res.json(req.body)  
})

app.listen(PORT, () => {
    console.log(`Listing at Port: ${PORT}`);
})