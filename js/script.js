

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
<a href="${data.address}" target=”_blank” >link</a>`
}

const createListTemplate = (data) => {
const uList = document.getElementById(data.name);
const myArray = data.feature.split(",");
myArray.forEach((item, index) => {
      uList.innerHTML += `<li>`+item+`</li>`;
    });}




    document.addEventListener('DOMContentLoaded', function() {
      
      getInitialData.forEach((item, index) => {
        wrapper.innerHTML += createItemTemplate(item);
  createListTemplate(item);
      });

    });

