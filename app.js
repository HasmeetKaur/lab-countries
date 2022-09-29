console.log("HI!")

window.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("image");
    const button = document.querySelector("button");

    const fetchCountry = async () => {

        const response = await fetch("https://restcountries.com/v3.1/all");
        const jsonData = await response.json();
        image.src = jsonData.url;

    }
    button.addEventListener("click",fetchCountry);

    const getCountry = async () => {
        const countryUrls = [];
        for(let i = 1; i < 250; i++){
            countryUrls.push(`https://restcountries.com/v3.1/name/${i}`);
        }

        const countryPromises = countryUrls.map( async (url) => {
            const response = await fetch(url);
            return response.json();
        })

        Promise.all( countryPromises )
        .then((allResults) => {

            const countryData = allResults.map( (result) => result.data ).flat();
            
            const countryNames = countryData.map((country) => country.name);

            const countryUl = document.querySelector("ul");   
    
            countryNames.forEach((countryName) => {
                const nameLi = document.createElement("li");
                nameLi.textContent = countryName;
                countryUl.appendChild(nameLi);
            })

        })
    
    }

    const countryButton = document.querySelector("#country-button");
    countryButton.addEventListener("click", getCountry);

})