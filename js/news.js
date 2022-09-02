const loadAllCategory = async() =>{
  try{
   const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
   const data = await response.json();
   
   loadAllCategoryShow(data.data.news_category)
  }catch(err){
     console.log(err);
  }
   
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
    try{
      const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
      const data  = await response.json();
      loadCatagoryDetailsDisplay(data.data)
    }catch(err){
      console.log(err);
    }
   spinner(true)

   
}

const loadCatagoryDetailsDisplay = (datas) =>{
      const numderOfNews = document.getElementById('numberOf-news');
      numderOfNews.innerHTML = `<p class="fw-bold fs-5">Number of news : ${datas.length}</p>`;
     const cardContainer = document.getElementById('card-container');
     cardContainer.innerHTML = "";
     datas.forEach(data => {
        //console.log(data)
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
                   <p class="fw-bold"><i class="fa-solid fa-eye me-2"></i>${number}</p>
               </div>
               <div>
               <button onclick="modalLoadData('${_id}')" type="button" class="btn btn-info fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
               </div>
            </div>
         </div>
      </div>
     
        `;
        cardContainer.appendChild(div);
     });
    
     
}

const modalLoadData = async(id)=>{
  try{
   const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
   const data = await response.json();
   displayModalLoadData(data.data[0])
  }catch(err){
   console.log(err)
  }
}
const displayModalLoadData = (data) =>{
    console.log(data)
    const {author,total_view,title} = data;
    const {img,name,published_date} = author; 
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.setAttribute('class','fw-bold text-center')
    modalTitle.innerText = `${title}`
    modalBody.innerHTML = `
    <div class="card " style="width: 18rem;">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Author name: ${name ? name : 'No data available'}</h5>
    <p><small class="fw-bold fs-6">Number of view</small>: ${total_view? total_view : 'No data available'}</p>
    <p><small class="fw-bold fs-6">Published Date:</small> ${published_date}</p>
   
  </div>
</div>
        
    `;

}

const spinner = (isValue) =>{
   const spinnerBody = document.getElementById('spinner');
   if(isValue === true){
      spinnerBody.classList.remove('d-none');
   }
   else{
      spinnerBody.classList.add('d-none');
   }
}

loadAllCategory()