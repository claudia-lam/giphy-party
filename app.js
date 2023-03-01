"use strict";

"hello";
async function getGiphy(evt) {
  evt.preventDefault();

  let search = $("#search").val();

  let response = await axios.get("http://api.giphy.com/v1/gif/search?", {
    params: { search },
  });

  console.log("response", response);

  $(".giphy-container").html(response.data);
}

$(".form").submit(getGiphy);
