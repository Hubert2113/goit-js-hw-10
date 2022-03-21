"use strict"
import './css/styles.css';
import _ from 'lodash';
import notiflix from "Notiflix"

const $searchBox = document.querySelector("#search-box");
const $countryList = document.querySelector(".country-list");
const $countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

function fetchCounteries(name){
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        // if(!response.ok){
        //     throw new Error(response.status);
        // }
        return response.json();
    })
    .then(countries => {
        console.log(countries);
        let $countryName = null;
        if(countries.length === 1){
            $countryName = document.createElement("li");
            $countryName.textContent = countries[0].name;
            $countryName.style.listStyle = `url("${countries[0].flags.svg}")`;
            $countryList.append($countryName);
        }
        // for(const country of countries){
            
        // }
    })
    .catch(error => {
        console.log(error);
    });
}

$searchBox.addEventListener("input", _.debounce((ev) => {
    if(ev.target.value !== ""){
    fetchCounteries(ev.target.value.trim());
    }else{
        while($countryList.firstChild){
            $countryList.removeChild($countryList.firstChild);
        }
    }
}, DEBOUNCE_DELAY));