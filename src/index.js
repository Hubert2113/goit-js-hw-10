"use strict"
import './css/styles.css';
import _ from 'lodash';
import Notiflix from 'notiflix';

const $searchBox = document.querySelector("#search-box");
const $countryList = document.querySelector(".country-list");
const $countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

$countryList.style.paddingLeft = "0px";

function fetchCounteries(name){
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok){
            throw response.status;
        }
        return response.json();
    })
    .then(countries => {
        console.log(countries);
        let $countryName = null;
        let $countryFlag = null;
        let $country = null;

        if(countries.length === 1){
            $country = document.createElement("div");
            $country.style.display = "flex";
            $country.style.alignItems = "center";

            $countryName = document.createElement("li");
            $countryName.style.listStyle = "none";
            $countryName.style.display = "inline";
            $countryName.style.fontSize = "35px";
            $countryName.style.marginLeft = "10px";
            $countryName.textContent = countries[0].name;

            $countryFlag = document.createElement("div");
            $countryFlag.style.width = "40px";
            $countryFlag.style.height = "30px";
            $countryFlag.style.backgroundImage = `url(${countries[0].flags.svg})`;
            $countryFlag.style.backgroundSize = "contain";
            $countryFlag.style.backgroundRepeat = "no-repeat";
            $countryFlag.style.backgroundPosition = "center";
            $countryFlag.style.display = "inline-block";

            $countryList.append($country);
            $country.append($countryFlag, $countryName);  

            $countryInfo.insertAdjacentHTML("beforeend", `
            <p style = 'font-size: 20px; margin-bottom: 10px;'><span style = 'font-weight: bold;'>Country: </span>${countries[0].capital}</p>
            `);

            $countryInfo.insertAdjacentHTML("beforeend", `
            <p style = 'font-size: 20px; margin-bottom: 10px;'><span style = 'font-weight: bold;'>Population: </span>${countries[0].population}</p>
            `);

            $countryInfo.insertAdjacentHTML("beforeend", `
            <p style = 'font-size: 20px; margin-bottom: 10px;'><span style = 'font-weight: bold;'>Languages: </span>${countries[0].languages[0].name}</p>
            `);


        }
        else if (countries.length <= 10){
            for(const country of countries){
                $country = document.createElement("div");
                $country.style.display = "flex";
                $country.style.alignItems = "center";

                $countryName = document.createElement("li");
                $countryName.style.listStyle = "none";
                $countryName.style.display = "inline";
                $countryName.style.fontSize = "35px";
                $countryName.style.marginLeft = "10px";
                $countryName.textContent = country.name;
                
                $countryFlag = document.createElement("div");
                $countryFlag.style.width = "40px";
                $countryFlag.style.height = "40px";
                $countryFlag.style.backgroundImage = `url(${country.flags.svg})`;
                $countryFlag.style.backgroundSize = "contain";
                $countryFlag.style.backgroundRepeat = "no-repeat";
                $countryFlag.style.backgroundPosition = "center";
                $countryFlag.style.display = "inline-block";
                
                $countryList.append($country);
                $country.append($countryFlag, $countryName);  
            }
        }else{
            Notiflix.Notify.info("Too many matches found. Please enter more specific name.");
        }
    })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}

$searchBox.addEventListener("input", _.debounce((ev) => {
    while($countryList.firstChild){
        $countryList.removeChild($countryList.firstChild);
    }
    while($countryInfo.firstChild){
        $countryInfo.removeChild($countryInfo.firstChild);
    }
    fetchCounteries(ev.target.value.trim());
}, DEBOUNCE_DELAY));