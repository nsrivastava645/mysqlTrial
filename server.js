const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const LanguageRoutes = require('./routes/languages');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/languages', LanguageRoutes);


app.listen(port, ()=>{
    console.log(`server running successfuly at ${port}`)
});