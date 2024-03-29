

const wrapper = document.querySelector('.wrapper');

const createItemTemplate = (data) => {
return `
<div class="row-item item shadow">

  <div class="container selesai" id="selesai" >
    <div class="list-item" id="completed-books">
${createRowRightTemplate(data)}
    </div>
  </div>

  <div class="container" id="belum-selesai">
  <div class="list-item" id="books">
${createRowLeftTemplate(data)}
  </div>
</div>

  </div>`
}

const createRowLeftTemplate = (data) => {
  return `<a href="${data.address}" target=”_blank” ><img class="img_port" src="${data.image}" alt="${data.address}"><a>`
}

const createRowRightTemplate = (data) => {
  return `
  <h4 class="">${data.name}</h4>
<ul id="${data.name}" ></ul>
<a href="${data.address}" target=”_blank” >link</a>
<a href="${data.github}" target=”_blank” >github link</a>`
}

const createListTemplate = (data) => {
const uList = document.getElementById(data.name);
const myArray = data.feature.split(",");
myArray.forEach((item, index) => {
      uList.innerHTML += `<li>`+item+`</li>`;
    });}


    const h1 = document.querySelector('.pageTitle');

    document.addEventListener('DOMContentLoaded', function() {
      h1.innerHTML='Front-End';
      getFontEndData.forEach((item, index) => {
        wrapper.innerHTML += createItemTemplate(item);
  createListTemplate(item);
      });

    });

    const btnFE = document.querySelector('#btnFE');
    const btnBE = document.querySelector('#btnBE');
    console.log

    btnFE.addEventListener("click", feFunction);

    function feFunction() {
      h1.innerHTML='Front-End';
      wrapper.innerHTML='';
  getFontEndData.forEach((item, index) => {
    wrapper.innerHTML += createItemTemplate(item);
createListTemplate(item);
  });

}

btnBE.addEventListener("click", beFunction);

function beFunction() {
  h1.innerHTML='Back-End';
  wrapper.innerHTML='';
getBackEndData.forEach((item, index) => {
wrapper.innerHTML += createItemTemplate(item);
createListTemplate(item);
});

}