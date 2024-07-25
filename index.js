// this is an array to store the library objects or the books
const myLibrary =[];


// Book constructor: defines a constructor object to create book objects with properties title, author, pages and read 
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  
  // Method to report book status based on this.read
  this.info = function() {
  let readStatus;
  if (this.read) {
  readStatus = "read";
  } else {
  readStatus = "not read yet";
  }

  // return a string with the book details
  return this.title + " by " + this.author + ", " + this.pages + " pages, " + readStatus;
  };
  }


//Method to toggle the read status 
//The prototype is a special object in JavaScript that allows you to add methods and properties to all instances of a given object (in this case, Book)
Book.prototype.toggleReadStatus = function (){
  this.read = !this.read
}


//function to add a book to the library array
function addBookToLibrary(title, author,pages,read){

  //this creates a newbook object that will be pushed to the array 
const newBook = new Book(title, author, pages, read);
myLibrary.push(newBook);
displayBook(); //call display after addding a new book 

}

//Manually adding a few books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);


//How do we display the books in the library on the webpage 
function displayBook(){

let bookContainer = document.getElementById("bookbody")

bookContainer.innerHTML = "" //clear exisiting content

//loops through the myLibrary array and adds HTML content for each book

myLibrary.forEach((book,index)=>{
  //bookContainer is a variable that represents a part of the HTML page where we want to show the books.
//innerHTML is used to add new HTML content inside this container.
//+= means we are adding new content to what is already there, not replacing it.

bookContainer.innerHTML+=
//data-index="${index}":

//The data- attributes are custom data attributes in HTML. They are used to store extra information that doesn't have a predefined meaning.

//data-index is a custom attribute that we are using to store the index of the book in the myLibrary array.

//${index} is a placeholder in a template literal (a feature of JavaScript that allows for embedded expressions). When the JavaScript code runs, ${index} will be replaced by the actual index of the book in the myLibrary array.

//This attribute helps to identify which book should be removed when the button is clicked.
  `<div class="book">
          <h1>${book.title}</h1>
          <h2>by ${book.author}</h2>
          <p>${book.pages} pages</p>
          <p>${book.read ? "Read" : "Not read yet"}</p>
          <button class="remove-book" data-index="${index}">Remove</button>
          <button class="toggle-read" data-index="${index}">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
    </div>
    <hr>`;

})

//add event listeners to remove buttons
//This line finds all the buttons with the class remove-book on the page and stores them in a variable called removeButtons.
const removeButtons = document.querySelectorAll('.remove-book');
//Again, we use the forEach method, but this time on the removeButtons NodeList (a list of all those buttons).
//For each button in this list, we add an event listener.

removeButtons.forEach(button => {
button.addEventListener('click',removeBook)
})

//add evemt listener to the toggle button
//this line finds all the buttons with the class of toggle-read
const toggleReadButtons = document.querySelectorAll('.toggle-read')

//Again, we use the forEach method, but this time on the toggleReadButtons NodeList (a list of all those buttons).
//For each button in this list, we add an event listener.
toggleReadButtons.forEach(button =>{
  button.addEventListener('click', toggleReadStatus)
})

}


//This defines a function named removeBook that runs when a remove button is clicked.
//event is an object that holds information about the click event.
function removeBook(event) {


  //event.target is the element that was clicked, which is the button.
//getAttribute('data-index') gets the value of the data-index attribute from the clicked button. This value tells us which book to remove from the array.

const index = event.target.getAttribute('data-index');

  //splice is a method that changes the content of an array by removing or replacing existing elements.
//index is the position of the book to remove, and 1 means we want to remove just one element at that position.
myLibrary.splice(index, 1);

  //splice is a method that changes the content of an array by removing or replacing existing elements.
//index is the position of the book to remove, and 1 means we want to remove just one element at that position.
displayBook();

}


//This defines a function named toggleReadStatus that runs when the toggle  button is clicked.
//event is an object that holds information about the click event.
function toggleReadStatus(event) {


//event.target is the element that was clicked, which is the button.
//getAttribute('data-index') gets the value of the data-index attribute from the clicked button. This value tells us which book to remove from the array.
const index = event.target.getAttribute('data-index');

// Toggle the read status of the book at the specified index
myLibrary[index].toggleReadStatus()

// Re-display books after toggling the read status
displayBook();

}




// Display the initial set of books 
displayBook();

// Show the form when the button is clicked
//get button and form element 
let newBookBtn = document.getElementById("newbook-btn");
let bookForm = document.querySelector(".book-form");

//add a clcik event listener to the button to show form 
newBookBtn.addEventListener('click', function(){
  bookForm.style.display="block"
})

//handle form submission 
let bookFormElement= document.getElementById("book-form")

bookFormElement.addEventListener('submit', function(event){
//prevent the default submission behavior
//by deafult submitting a form causes the browser to send the form data to a server and refresh page 
//this event.preventDefault() stops the default behavior and allows javascript to handle form data
event.preventDefault() 

//these lines below get the values entered by the user in the form fields 
//title: The value from the input field with ID title.
//author: The value from the input field with ID author.
//pages: The value from the input field with ID pages.
//read: The checked status (boolean) from the checkbox with ID read.

const title = document.getElementById("title").value
const author = document.getElementById("author").value;
const pages = document.getElementById("pages").value;
const read = document.getElementById("read").checked;

//the line calls the 'addBookToLibrary' fucntion with the retrieved form values as arguments 
//The addBookToLibrary function creates a new Book object and adds it to the myLibrary array, then calls displayBooks to update the displayed book list.
if (title && author && pages) { // Basic validation to ensure no empty values
addBookToLibrary(title, author, pages, read);

//bookForm.reset(): This method resets the form fields to their default values, effectively clearing the form.
//bookForm.style.display = "none": This hides the form after submission, returning to its initial hidden state.
bookFormElement.reset(); 
bookForm.style.display = "none";
} else {
  alert("Please fill in all the fields.");
}




})