const galleryImages =[
    {
        src:"./assets/gallery/image1.jpg",
        alt:"thumbnail 1"
    },
    {
        src:"./assets/gallery/image2.jpg",
        alt:"thumbnail 2"
    },
    {
        src:"./assets/gallery/image3.jpg",
        alt:"thumbnail 3"
    }
]
const ProductList = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]
const weatherAPIKey = "415f83df67f8e1a65936a76592fb6c2a";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
    document.querySelector("header nav .wrapper").classList.add("nav-open");
});
document.querySelector("#close-nav-menu").addEventListener("click",function(){
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
});
}
function greetingHandler(){
    let currentHour = new Date().getHours();
let greetingText;
if (currentHour<12){
    greetingText = "Good Morning!";
}else if (currentHour<18){
    greetingText = "Good Afternoon!";
}else if (currentHour<24){
    greetingText = "Good Evening!";
}else{
    greetingText = "Welcome!";
}
document.getElementById("greeting").innerHTML = greetingText;
document
}
function celsiusToFahr(celsius){
    let fahr = (celsius *9/5) + 32;
    return fahr;
}
function clockHandler(){
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, '0');
        document.querySelector("span[data-time=minutes]").innerHTML = localTime.getMinutes().toString().padStart(2, '0');
        document.querySelector("span[data-time=seconds]").innerHTML = localTime.getSeconds().toString().padStart(2, '0');
    },1000)    
}
function greet(){
    document.getElementById("name").addEventListener("change", function(){
        let name = document.getElementById("name").value;
        if (name.length >= 20){
            alert("maximum length can be 20");
        }else if (name.length <20){
        alert(`Hello, ${name} welcome to our page. Please share your valuable feedback with us.`);
        }
    })
}
function InputHandler(){
    document.getElementById("blog").addEventListener("change", function(){
          document.getElementById("greet").innerHTML = `Suggestion: ${document.getElementById("blog").value}`;
          if (document.getElementById("greet").textContent.length > 200){
            document.getElementById("submit").style.backgroundColor = "green";
            document.getElementById("submit").addEventListener("click", function(){
                alert("Thanks for your feedback. Have a nice day!");
                document.getElementById("blog").value="";
                document.getElementById("greet").textContent = "";
            })
          }else if (document.getElementById("greet").textContent.length > 300){
            alert("maximum word limit reached");
            document.getElementById("submit").style.backgroundColor = "green";
            document.getElementById("submit").addEventListener("click", function(){
                alert("Thanks for your feedback. Have a nice day!");
                document.getElementById("blog").value="";
                document.getElementById("greet").textContent = "";
            })
          }
    })    
}
function galleryHandler(){
    let mainImage = document.querySelector("#gallery> img");
    const thumbnails = document.querySelector("#gallery .thumbnails");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    galleryImages.forEach(function(image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
        thumb.addEventListener("click", function(e){
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            document.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            })
            e.target.dataset.selected = true;
        });
        thumbnails.appendChild(thumb);
    })
}
function populateProducts(products){
        let productSection = document.querySelector(".products-area");
        productSection.textContent = "";
        products.forEach(function(product, index){    
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
    
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = `This is an image of ${product.alt}`;
        
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;
        let Author = document.createElement("p");
        Author.classList.add("author");
        Author.textContent = product.author;
        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price ";
        let price = document.createElement("p");
        price.classList.add("price");
        price.textContent = product.price > 0 ? " $ " + product.price.toFixed(2) : "Free";
    
        productDetails.append(productTitle);
        productDetails.append(Author);
        productDetails.append(priceTitle);
        productDetails.append(price);
        productElm.append(productImage);
        productElm.append(productDetails);
        productSection.append(productElm);
        })
}
function productHandler(){
    let freeProducts = ProductList.filter(item => !item.price || item.price <= 0);
    let paidProducts = ProductList.filter(item => item.price > 0);
    console.log(paidProducts,freeProducts);
    populateProducts(ProductList);
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = ProductList.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    document.querySelector(".products-filter").addEventListener('click', (e) =>{
        
        if (e.target.id == "all"){
            populateProducts(ProductList);
        } else if (e.target.id == "free"){
            populateProducts(freeProducts);
        } else if (e.target.id == "paid"){
            populateProducts(paidProducts);
        }
    })
}
function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.getElementById("footer").textContent = `© ${currentYear} - All rights reserved`;
}
function weatherHandler(){
navigator.geolocation.getCurrentPosition(position =>{
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let url = weatherAPIURL.replace("{lat}",latitude).replace("{lon}",longitude).replace("{API key}",weatherAPIKey);
    fetch(url)
    .then(response =>response.json())
    .then(data => {
        console.log(data);
        const location = data.name;
        const weather = data.weather[0].description;
        const celsius = data.main.temp/10;
        let celsiusText = `The weather has ${weather} in ${location} and it's ${celsius.toFixed(1)}°C outside`;
        let fahrText = `The weather has ${weather} in ${location} and it's ${celsiusToFahr(celsius).toFixed(1)}°F outside`;
        document.getElementById("weather").innerHTML = celsiusText;
        document.querySelector(".weather-group").addEventListener("click", function(e){
            if (e.target.id =="celsius"){
                document.getElementById("weather").innerHTML = celsiusText;
            }else if (e.target.id =="fahr"){
                document.getElementById("weather").innerHTML = fahrText;
            }
        })
    }
);
}
)}
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
greet();
InputHandler();
galleryHandler();
productHandler();
footerHandler();