const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const dbtable = require('./models/dbModel');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
});
app.get('/signout',async (req,res)=>{
    try {
        // Get the token from cookies
        const token = req.cookies.token;
        if (!token) return res.redirect('/signup'); // If no token, just redirect

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email; // Extract email from token

        // Delete user from the database
        await dbtable.query('DELETE FROM DBadmin WHERE email = ?', [userEmail]);

        // Clear the cookie
        res.clearCookie('token');

        // Redirect to signup page
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while signing out');
    }
});
app.post('/signup', async (req, res) => {
    try {
        const {name,email,password}=req.body;
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        await dbtable.query('INSERT INTO DBadmin (name, email, password) VALUES (?, ?, ?)', 
                      [name, email, hashedPassword]);
        const token=jwt.sign({email},process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error while signup');
    }
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.post('/login', async (req, res) => {
    try {
        const {email,password}=req.body;
        const [rows] = await dbtable.query('SELECT * FROM DBadmin WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }
        const token=jwt.sign({email},process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error while login');
    }
});
app.get('/incstock', async (req, res) => {
    try {
        const [rows] = await dbtable.query('SELECT * FROM BloodGroup');
        res.render('inc_stock', { bloodData: rows });
    } catch (error) {
        console.error(error);
        res.send('Error loading stock page');
    }
});
app.post('/incstock', async (req, res) => {
    const { blood_group, units } = req.body;
    try {
        await dbtable.query('UPDATE BloodGroup SET units = units + ? WHERE blood_group = ?', [units, blood_group]);
        res.redirect('/incstock');
    } catch (error) {
        console.error(error);
        res.send('Error updating stock');
    }
});

app.listen(5000);