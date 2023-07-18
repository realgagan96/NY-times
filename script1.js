const promise = fetch(
  "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=FTs3A5DLSrvU873t4Tp3HvQnwWCDJo5A",
  {
    method: "GET",
  }
);

promise
  .then((response) => response.text())
  .then((body) => {
    let parsedData = JSON.parse(body);
    addDropdown(parsedData);
    displayMainTitles(parsedData);
    collectImages(parsedData);
  });

// function to build a dropdown with options for each category of books
const addDropdown = (data) => {
  let categories = data.results.lists;
  let options = `<option value='pick'>Pick a Category...</option>`;
  categories.forEach((category) => {
    options += `<option value='${category.list_id}'>${category.list_name}</option>`;
  });
  dropdown.innerHTML = options;
};

// function to display image, title and author of the book upon selection from the dropdown
const displayMainTitles = (data) => {
  dropdown.addEventListener("change", (event) => {
    let bookTitles = "";
    let bookListID = event.target.value;
    let categories = data.results.lists;

    const filteredList = categories.filter(
      (category) => category.list_id === Number(bookListID)
    );
    console.log(filteredList);
    output.innerHTML = "";
    filteredList.forEach((list) => {
      list.books.map((book) => {
        console.log(book);

        bookTitles = `<div class="card mb-3" >
  <div class="row g-0">
    <div class="col-sm-4 col-md-4 text-sm-center text-md-right">
      <img src="${book.book_image}" class="img-fluid rounded-start" alt="${book.title}">
    </div>
    <div class="col-sm-8 col-md-8">
      <div class="card-body">
        <h4 class="card-title">${book.title}</h4>
        <h5>${book.author}</h5>
        <p class="card-text">${book.description}</p>
      </div>
    </div>
  </div>
</div>`;

        //     bookTitles = `<div class="row card">
        //     <div class="col-xs-12 col-sm-4 bookcover">
        //         <img src="" alt="">
        //     </div>
        //     <div class="col-xs-12 col-sm-6 bookdetails">
        //         <h3>${book.title}</h3>
        //         <h4>${book.author}</h4>
        //         <p>${book.description}</p>
        //     </div>
        // </div>`;

        output.innerHTML += bookTitles;
      });
    });

    // filteredList.forEach((list) => {
    //     list.books.forEach((book) => {
    //         console.log(book);
    //         bookTitles += `<img src=${book.book_image}><h3>${book.title}</h3><h4>${book.author}</h4><p>${book.description}</p>`;
    //     });
    //     output.innerHTML = bookTitles;
    // });
  });
};

//function to collect all image URLs in an array
// const justImages = document.querySelector(".justImages");
let coverImgs = [];
const collectImages = (data) => {
  let categories = data.results.lists;
  let imageHtml = "";
  categories.forEach((category) => {
    category.books.forEach((book) => {
      coverImgs.push(book.book_image);
      coverImgs.forEach((image) => {
        imageHtml += `<img src="${image}" />`;
      });
    });
  });
};
// console.log(coverImgs);

// script to render a slider of book cover images
let slideIndex = 0;
const imageSlider = document.querySelector(".imgSlider");

const nextImage = () => {
  // slideIndex = (slideIndex + 1) % coverImgs.length;
  if (slideIndex >= coverImgs.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex = slideIndex + 1;
  }
  updateImage();
};

const prevImage = () => {
  // slideIndex = slideIndex - 1 + coverImgs.length % coverImgs.length;
  slideIndex = slideIndex - 1;
  if (slideIndex < 1) {
    slideIndex = coverImgs.length - 1;
  }
  updateImage();
};

const updateImage = () => {
  console.log(imageSlider);
  imageSlider.innerHTML = `<img class="slideImage" src=${coverImgs[slideIndex]}>`;
};
/*
const updateImage = () => {
    console.log(slideIndex);
    const imageSlider = document.querySelector(".imgSlider img");
    imageSlider.outerHTML = `<img class="slideImage" src=${coverImgs[slideIndex]}>`;
};
*/

// setInterval(nextImage, 3000);
const lArrow = document.getElementById("arrow-left");
const rArrow = document.getElementById("arrow-right");
lArrow.addEventListener("click", prevImage);
rArrow.addEventListener("click", nextImage);
// const nextImage () => {
//     slideIndex =
// }

// end slider script

const dropdown = document.getElementById("dropdown");
const output = document.getElementById("output");
const bookCover = document.getElementById("bookCover");

const slides = document.querySelectorAll(".slides img");

/* STEPS TO CREATE A SLIDER OF BEST SELLERS */

// collect images in an array

// create a slider

// create html css

// have the slider slide every 3s

// push images into the slider

//SCRIPT FOR SLIDER BELOW

/*
RYAN'S RECOMMENDATION TO RENDER HTML ELEMENTS
let p = document.createElement("p");
p.innerText = "My text!";

let img = document.createElement("img");
img.src = "http://path.to/my/image.png";

let container = document.createElement("div");
container.appendChild(p);
container.appendChild(img);

document.getElementById("container").appendChild(container);
*/
