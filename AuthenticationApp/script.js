const express = require('express');
const fs = require('fs');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');


// Helper function to read users
function getUsers() {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
}

// Helper function to save users
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}


// ================= REGISTER =================
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {

    const { name, rollno, className, course, subjects, email, address, password } = req.body;

    const users = getUsers();

    // Check if already registered
    const existingUser = users.find(user => user.email === email || user.rollno === rollno);

    if (existingUser) {
        return res.send("User already registered ❌");
    }

    users.push({
        name,
        rollno,
        className,
        course,
        subjects,
        email,
        address,
        password
    });

    saveUsers(users);

    res.redirect('/login');
});
app.get('/', (req, res) => {
    res.redirect('/login');   // or '/register'
});



// ================= LOGIN =================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const users = getUsers();

    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        return res.send("Invalid credentials ❌");
    }

    req.session.user = validUser;

    res.redirect('/dashboard');
});


// ================= DASHBOARD =================
app.get('/dashboard', (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', { user: req.session.user });
});


// ================= LOGOUT =================
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
