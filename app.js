"use strict";

const GIPHY_BASE_URL = "http://api.giphy.com/v1";
const GIPHY_API_KEY = "u0m6RVDC8jN9C65VwgvPFerw8SW6Pqyd";
const $gifContainer = $(".giphy-container");
const $removeBtn = $("#remove-images");

async function addGiphy(evt) {
  evt.preventDefault();

  //get search value form form
  let searchTerm = $("#search-form").val();

  //make a get request to giphy api for search term
  const response = await axios.get(`${GIPHY_BASE_URL}/gifs/search`, {
    params: { q: searchTerm, api_key: GIPHY_API_KEY },
  });

  console.log("response", response.data.data);

  //pick a random gif
  const randomGif = pickRandomGif(response.data.data);

  //create html of new image
  const newImg = createImg(randomGif);

  //add gif to gif container in html
  $gifContainer.append(newImg);
}

function pickRandomGif(responseData) {
  const randomNum = Math.floor(Math.random() * responseData.length);
  const gifUrl = responseData[randomNum].images.original.url;
  return gifUrl;
}

function createImg(gifUrl) {
  const $img = $('<img id="giphy-img">');
  $img.attr("src", gifUrl);
  return $img;
}

function removeGifs(evt) {
  $gifContainer.empty();
}

$("#search").submit(addGiphy);
$removeBtn.submit(removeGifs);

