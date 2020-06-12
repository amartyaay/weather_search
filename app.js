const api="f1371f83c9d11b781b888e8b6d65fc4d";
let long;
let latt;
const searchInput = document.querySelector("#opt-search");
const currentInput= document.querySelector("#opt-current");
const divCity=document.querySelector(".city");

searchInput.addEventListener("click",()=>{
    search();
});
currentInput.addEventListener("click",()=>{
    current();
});

function current(){
    divCity.classList.add("invisible");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            latt = position.coords.latitude;
            console.log(latt);
            console.log("Longi is ",long);
            api_fetch(latt,long);
        });
    }
    else{
        alert("Allow Location");
    }
};

function search(){
    let cityValue;
    divCity.classList.remove("invisible");
    console.log("search is selected");
    const city= document.querySelector("#city");
    city.addEventListener("change",()=>{
        cityValue=city.value;
        // console.log(cityValue);
        // btn.addEventListener("click",()=>{
        //     console.log(cityValue);
            api_fetch(cityValue,'');
    });
    const btn = document.querySelector(".city_search");
    btn.addEventListener("click",()=>{
        console.log(cityValue);
    });
};


function api_fetch(lattCity,long){
    if(long!==''){
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattCity}&lon=${long}&appid=${api}`;
    }
    else{
        url = `https://api.openweathermap.org/data/2.5/weather?q=${lattCity}&appid=${api}`;
    }
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            console.log(data);
            console.log(data["weather"][0]["description"]);
            const title = document.querySelector(".card-title");
            title.textContent = data["weather"][0]["description"].toUpperCase();
        });
};

