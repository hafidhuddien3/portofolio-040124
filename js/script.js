const wrapper = document.querySelector(".wrapper");

const createItemTemplate = (data) => {
  return `
<div class="row-item item shadow fade-in-out">

  <div class="container selesai" id="selesai" >
    <div class="list-item" id="completed-books">
${createRowRightTemplate(data)}
    </div>
  </div>

  <div class="container_image">
${createRowLeftTemplate(data)}
</div>

  </div>`;
};

const createRowLeftTemplate = (data) => {
  return `<div><a href="${data.address}" target=”_blank” ><img class="img_port" src="${data.image}" alt="${data.address}"></a></div>`;
};

const createRowRightTemplate = (data) => {
  return `
  <h4 class="">${data.name}</h4>
<ul id="${data.name}" ></ul>
<a href="${data.address}" target=”_blank” >link</a>
<a href="${data.apkVer}" target=”_blank” >${data.apkVer?"apk version":""}</a>
<a href="${data.github}" target=”_blank” ></a>`;
};

const createListTemplate = (data) => {
  const uList = document.getElementById(data.name);
  const myArray = data.feature.split(",");
  myArray.forEach((item, index) => {
    uList.innerHTML += `<li>` + item + `</li>`;
  });
};

const h1 = document.querySelector(".pageTitle");

document.addEventListener("DOMContentLoaded", function () {
  h1.innerHTML = '<h2 class="fade-in-out">Website</h2>';
  getWebData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
    createListTemplate(item);
  });
});
///
const btnMobile = document.querySelector("#btnMobile");
const btnWeb = document.querySelector("#btnWeb");
const btnFE = document.querySelector("#btnFE");
const btnBE = document.querySelector("#btnBE");

btnMobile.addEventListener("click", mobileFunction);

function mobileFunction() {
  h1.innerHTML = '<h2 class="fade-in-out">Mobile</h2>';
  wrapper.innerHTML = "";
  getMobileData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
    createListTemplate(item);
  });
}

btnWeb.addEventListener("click", webFunction);

function webFunction() {
  h1.innerHTML = '<h2 class="fade-in-out">Website</h2>';
  wrapper.innerHTML = "";
  getWebData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
    createListTemplate(item);
  });
}

btnFE.addEventListener("click", feFunction);

function feFunction() {
  h1.innerHTML = '<h2 class="fade-in-out">Front-End</h2>';
  wrapper.innerHTML = "";
  getFontEndData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
    createListTemplate(item);
  });
}

btnBE.addEventListener("click", beFunction);

function beFunction() {
  h1.innerHTML = '<h2 class="fade-in-out">Back-End</h2>';
  wrapper.innerHTML = "";
  getBackEndData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
    createListTemplate(item);
  });
}

// gradient
const gradDiv = document.getElementById('grad1');
const clockP = document.getElementById('clock');
const sunMoonImage = document.getElementsByClassName('img-sun-moon');
const pageTitleH2 = document.getElementsByClassName('pageTitle');


// Get current hour (0-23)
// const hour = new Date().getHours();

const now = new Date();

const hour = now.getHours();      // 0-23
const minutes = now.getMinutes(); // 0-59

console.log(`Current time: ${hour}:${minutes}`);
clockP.innerHTML = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

// Decide overlay color
const isDay = (hour >= 6 && hour < 18)
// const isDay = true;
const overlayColor = isDay ? '255,255,255' : '0,0,0'; // white for day, black for night
sunMoonImage[0].src = isDay ? 'assets/imageLayout/Sun-PNG-Image-Background.png' : 'assets/imageLayout/moon-illustration-design-free-png.webp';
sunMoonImage[0].style.animation= isDay ? 'rotateBox 20s linear infinite' : 'rotateBoxMoon 7s linear infinite';
// sunMoonImage[0].classList.toggle('glow-animate', isDay);
pageTitleH2[0].style.color= isDay ? 'black' : 'white' ;
document.body.style.backgroundImage = isDay ? "" : "url('assets/imageLayout/night2.png')";
clockP.style.color = isDay ? 'white' : 'white' ;

// Set the background with overlay gradient
gradDiv.style.background = `
  linear-gradient(to right, rgba(0,0,0,0) 20%, rgba(${overlayColor},0.5) 100%),
  linear-gradient(to bottom left, blue, white),
  blue
`;

// Optional: keep the animation working
gradDiv.style.backgroundSize = 'cover, 200% 200%';
gradDiv.style.backgroundPosition = 'center, left bottom';
gradDiv.style.animation = 'zoomMove 5s infinite alternate';