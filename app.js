"use strict";

const GIPHY_BASE_URL = "http://api.giphy.com/v1";
const GIPHY_API_KEY = "u0m6RVDC8jN9C65VwgvPFerw8SW6Pqyd";

async function getGiphy(evt) {
  evt.preventDefault();

  let searchTerm = $("#search-form").val();

  const response = await axios.get(`${GIPHY_BASE_URL}/gifs/search`, {
    params: { q: searchTerm, api_key: GIPHY_API_KEY },
  });

  console.log("response", response.data.data);

  const randomGif = pickRandomGif(response.data.data);
  console.log(randomGif);

  const gifUrl = response.data.data[randomGif].images.original.url;
  console.log(gifUrl);

  const newImg = createImg(gifUrl);

  $(".giphy-container").append(newImg);
}

function pickRandomGif(responseData) {
  return Math.floor(Math.random() * responseData.length);
}

function createImg(gifUrl) {
  const $img = $('<img id="giphy-img">');
  $img.attr("src", gifUrl);
  return $img;
}

$("#search").submit(getGiphy);
