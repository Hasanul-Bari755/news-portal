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
   console.log(data.data)
}
loadAllCategory()