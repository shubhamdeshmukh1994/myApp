const express = require("express");
const hbs = require('hbs');
const app = express();

app.use(express.json());

app.set('view engine', 'hbs');

app.set('views', 'views');


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));

// Default route

let demo = {
    name: 'Rohan',
    age: 26
}
app.get('/', (req, res) => {
    res.render('index', { demo: demo });
});



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,function(){
	console.log("listing to port : "+PORT);
	const host = server.address().address
	const port = server.address().PORT
	console.log("Example app listening at http://", host, PORT)
})