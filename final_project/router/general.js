const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if(username && password) {
    //check if username is already taken
    if(!isValid(username)) {
      return res.status(400).json({message: "Username already taken"});
    } else {
      //add username and password to users object
      users.push({username: username, password: password});
      return res.status(200).json({message: "User registered successfully"});
    }
  } else {
    return res.status(400).json({message: "Invalid username"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 3)));
  });
    get_books.then(() =>  console.log("Promise for Task 10 resolved"));

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const get_book_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if(book) {
      resolve(res.send(book));
    } 

    reject(res.status(404).json({messgae:"ISBN not found"}));

    get_book_isbn.then(function() {
      console.log("Promise for Task 11 resolved");
    }).catch(function() {
      console.log("Promise for Task 11 rejected");
    });
 });
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
    }
});
    res.send(JSON.stringify({booksbyauthor}, null, 4));

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let booksbytitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === req.params.title) {
      booksbytitle.push({"isbn":isbn,
                          "author":books[isbn]["author"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  res.send(JSON.stringify({booksbytitle}, null, 4));

  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const review = books[isbn].reviews;
  
  if(review) {
      res.send(review);
  } else {
      res.status(404).json({messgae:"Review not found"});
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
