fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })

function showData(jsonData) {
    console.log(jsonData)
    jsonData.forEach(showDish)
}


function showDish(dish) {

    const imageName = dish.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const template = document.querySelector("#AllDishes").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = dish.name;
    clone.querySelector(".category span").textContent = dish.category;
    clone.querySelector(".ident span").textContent = dish.id;
    clone.querySelector(".sd").textContent = dish.shortdescription;
    /*clone.querySelector(".veg span").textContent = dish.vegetarian;*/
    clone.querySelector(".alcohol span").textContent = dish.alcohol;
    clone.querySelector(".dis span").textContent = dish.discount;
    clone.querySelector(".so span").textContent = dish.soldout;
    clone.querySelector(".price span").textContent = dish.price;
    clone.querySelector(".image").src = smallImg;

    if (dish.discount) {
        clone.querySelector(".price").style.textDecoration = "line-through"
    } else {
        clone.querySelector(".dis").remove()
    }

    if (dish.vegetarian) {
        clone.querySelector(".veget").style.display = "block"
    }

    if (dish.soldout) {
        clone.querySelector("article").style.backgroundColor = "#C73A41"
        clone.querySelector("article").style.opacity = "25%"
        /*clone.querySelector("article").classList.add(".soldout")*/
        console.log("yeah")
    } else {
        console.log("nah")
    }

    document.querySelector("#dw").appendChild(clone);
}
