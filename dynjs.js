const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        createCategories(data)
    })

function createCategories(jsonData) {
    jsonData.forEach(function (oneCat) {
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        document.querySelector("header>nav").appendChild(a);
        a.textContent = oneCat;
        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);
        document.querySelector("main").appendChild(section);
    })
    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    console.log(jsonData)
    jsonData.forEach(showDish)
}


function showDish(dish) {

    const smallImg = getImageName(dish.image);
    const template = document.querySelector("#AllDishes").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = dish.name;
    /*clone.querySelector(".category span").textContent = dish.category;
    clone.querySelector(".ident span").textContent = dish.id;*/
    clone.querySelector(".sd").textContent = dish.shortdescription;
    /*clone.querySelector(".veg span").textContent = dish.vegetarian;*/
    /*clone.querySelector(".alcohol").textContent = dish.alcohol;*/
    /*clone.querySelector(".dis span").textContent = dish.discount;*/
    /*clone.querySelector(".so span").textContent = dish.soldout;*/
    clone.querySelector(".price span").textContent = dish.price;
    clone.querySelector(".image").src = smallImg;

    if (dish.discount) {
        /*clone.querySelector(".price").style.textDecoration = "line-through";*/
        clone.querySelector(".price").classList.add("disc")
        const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);
        clone.querySelector(".discount span").textContent = newPrice;
    } else {
        clone.querySelector(".discount").remove();
    }

    if (dish.vegetarian) {
        /*clone.querySelector(".veget").style.display = "block"*/
        clone.querySelector(".veget").classList.add("show");
    }

    if (dish.soldout) {
        /*clone.querySelector("article").style.backgroundColor = "#C73A41"
        clone.querySelector("article").style.opacity = "25%"*/
        clone.querySelector("article").classList.add("soldout")
    }

    if(dish.alcohol != "0"){
        console.log("yeah")
        clone.querySelector(".alcohol").textContent = "Alcohol: " + `${dish.alcohol}` + "%";
    }else{
        clone.querySelector(".alcohol").textContent = "Alcohol free";
    }

    clone.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });
    document.querySelector(`#${dish.category}`).appendChild(clone);
    /*document.querySelector("#dw").appendChild(clone);*/
}

function getImageName(imageName){
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    return base + "small/" + imageName + "-sm.jpg";
}
function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-image").src = getImageName(data.image);
  modal.classList.remove("hide");
}


/*window.onscroll = function () {
    stickybar()
    scrollFunction()
};

function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}*/
