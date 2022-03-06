const breweryEle = document.getElementById("breweryList");
const searchBar = document.getElementById("searchBar");
let breweryList = [];

const loadBreweryLists = async () => {
  try {
    const res = await fetch("https://api.openbrewerydb.org/breweries");
    breweryList = await res.json();
    console.log("breweryList", breweryList);
    console.log("breweryListOne", breweryList[0]);
    displayBreweryList(breweryList);
  } catch (err) {
    console.error(err);
  }
};

loadBreweryLists();

const displayBreweryList = (breweryList) => {
  const htmlString = breweryList
    .map((brewery) => {
      return `
              <li class="brewery">
                  <h2>Name: ${brewery.name}</h2>
                  <p>Type: ${brewery.brewery_type}</p>
                  <p>Address1: ${brewery.address_2}</p>
                  <p>Address2: ${brewery.address_3}</p>
                  <p>Website Url: <a href='${brewery.website_url}'>click here</a></p>
                  <p>Phone No: ${brewery.phone}</p>
              </li>
          `;
    })
    .join("");
  breweryEle.innerHTML = htmlString;
};
searchBar.addEventListener("keyup", (e) => {
  console.log("E", e.target.value);
  if (e.target.value) {
    searchListOfBrewery(e.target.value.toLowerCase());
  } else {
    loadBreweryLists();
  }
});

const searchListOfBrewery = async (val) => {
  try {
    const res = await fetch(
      `https://api.openbrewerydb.org/breweries/search?query=${val}`
    );
    breweryList = await res.json();
    console.log("searchbreweryList", breweryList);
    displayBreweryList(breweryList);
  } catch (err) {
    console.error(err);
  }
};
