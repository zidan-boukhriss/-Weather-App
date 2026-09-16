const searchIput = document.getElementById("city-name");
const searchButton = document.getElementById("search");
const apiKey = "934dd879fad64c1aa37141847260909";
const url = `http://api.weatherapi.com/v1/current.json`;


searchButton.addEventListener("click", (_) => {
  fetchData(searchIput.value);
});

function showResult(data) {
  document.querySelector('.result').replaceChildren()
  if (data == "") {
    return;
  }
  if (data.error) {
    document.querySelector(".result").innerHTML =
      `<p style=' height: 300px; font-size: 1.5rem;text-align:center'>${data.error.message}</p>`;
    return;
  }
  const CardContainer = document.createElement("div");
  const card = document.createElement("div");
  const cardHead = document.createElement("div");
  const cardMain = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const p2 = document.createElement("p");

  CardContainer.classList.add("card-container");
  card.classList.add("card");
  cardHead.classList.add("card-head");
  cardMain.classList.add("card-main");

  p.classList.add("date");
  h3.innerHTML =
    data.location.name +
    ", " +
    "<span style='font-size: 1rem'>" +
    data.location.country +
    "</span>";
  p.innerHTML = data.location.localtime;

  p2.classList.add("temp");
  p2.innerHTML = data.current.temp_c + " C°";

  cardMain.appendChild(p2);
  cardHead.appendChild(h3);
  cardHead.appendChild(p);
  card.appendChild(cardHead);
  card.appendChild(cardMain);
  CardContainer.appendChild(card);
  document.querySelector(".result").append(CardContainer);
}
function loading() {
  document.querySelector(".result").innerHTML = "<p id='loading'>Loding...</p>";
}

async function fetchData(city) {
  if (city.trim() == "") {
    alert("Pleas Enter city name");
    return;
  }

  loading();

  try {
    const response = await fetch(`${url}?key=${apiKey}&q=${city}`);

    const data = await response.json();
    
    showResult(data);
  } catch (e) {
    console.log(e);
    document.querySelector(".result").innerHTML =
      `<p> Erorro while fetching the date </p>`;
  }
}
