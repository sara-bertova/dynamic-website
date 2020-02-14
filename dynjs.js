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
    jsonData.forEach(showDish)
}


function showDish(dish) {

    const smallImg = getImageName(dish.image);
    const template = document.querySelector("#AllDishes").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = dish.name;
    clone.querySelector(".sd").textContent = dish.shortdescription;
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
        clone.querySelector(".so").textContent = "SOLD OUT"
    }

    if (dish.alcohol != "0") {
        clone.querySelector(".alcohol").textContent = "Alcohol: " + `${dish.alcohol}` + "%";
    } else {
        clone.querySelector(".alcohol").textContent = "Alcohol free";
    }

    clone.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
    document.querySelector(`#${dish.category}`).appendChild(clone);
}

function getImageName(imageName) {
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    return base + "small/" + imageName + "-sm.jpg";
}

function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-image").src = getImageName(data.image);
    modal.classList.remove("hide");
}


window.onscroll = function () {
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

// click on the button = scroll to the top
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
