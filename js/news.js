const loadAllCategory = async() =>{
   const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
   const data = await response.json();
   loadAllCategoryShow(data.data.news_category)
}

const loadAllCategoryShow = (datas) =>{
   //console.log(datas)
   const showCategory  = document.getElementById('show-category');
   datas.forEach(data => {
       //console.log(data)
       const {category_name,category_id} = data;
     //  console.log(category_id)
       const p = document.createElement('p');
        p.setAttribute("class","fw-bold");
     
        p.innerHTML =`<div onclick="loadCatagoryDetails('${category_id}')">
        <a class="text-decoration-none text-black" href="#">${category_name}</a>
        </div>`;
       showCategory.appendChild(p)
   });
}

const loadCatagoryDetails = async (id) =>{ 
   const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
   const data  = await response.json();
   loadCatagoryDetailsDisplay(data.data)
}

const loadCatagoryDetailsDisplay = (datas) =>{
     const cardContainer = document.getElementById('card-container');
     cardContainer.innerHTML = "";
     datas.forEach(data => {
      //  console.log(data)
        const {thumbnail_url,title,details,author,rating,_id} = data;
        const {img,name} = author;
        const{number} = rating;
        const div = document.createElement('div');
      //  div.classList.add("row g-0");
      div.setAttribute("class","row g-0 mt-2 p-3 shadow ")
        div.innerHTML = `
        <div class="col-md-4">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title fw-bold">${title}</h5>
          <p class="card-text">${details}</p>
          <div class="d-flex justify-content-between">
               <div class="d-flex">
                  <img src="${img}" class="rounded-circle img" alt="...">
                  <p class="ms-3">${name? name : 'No data available'}</p>
               </div>
               <div>
                   <p class="fw-bold">${number}</p>
               </div>
               <div>
               <button onclick="modalLoadData('${_id}')" type="button" class="btn btn-info fw-bold">Details</button>
               </div>
            </div>
         </div>
      </div>
     
        `;
        cardContainer.appendChild(div);
     });
}

const modalLoadData = async(id)=>{
   const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
   const data = await response.json();
   displayModalLoadData(data.data[0])
}
const displayModalLoadData = (data) =>{
    console.log(data)
    const {author} = data;
}
loadAllCategory()