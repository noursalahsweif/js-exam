/// <reference types="../@types/jquery/" />



// ----------------------------- home inpus =---------------------------------

let sideNav = document.getElementById("sidenav");
let mealsShow = document.getElementById("mealsshow");

// ----------------------------- search inputs --------------------------------





$(".option").on("click" , function(){

    $(".leftnav").toggle(1000);
    $(".animate").animate({top:"20px"},1000) 
})






$.ajax({
    type: "get",
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    data: {},
    dataType: "json",
    success: function (response) {
        // console.log(response);
        let data = response.meals;
        // console.log(data);
        var cartona = "";
        for (var i =0 ; i<20;i++){
            cartona += `<div class="col-md-3 position-relative mt-3 overflow-hidden " id="layer-group">
            <div class="img ">
                <img src="${data[i].strMealThumb}" alt="" >
            </div>
            <div class="layer position-absolute d-flex "> <h2>${data[i].strMeal}</h2> </div>
        </div>`
        }
        mealsShow.innerHTML = cartona;
        
    }
});



// ========================================================= search js code ==========================================================



$("#search").on("click" , function(){
    mealsShow.innerHTML = `<div class="col-md-6 mt-5">
    <input type="text" class="form-control bg-black text-white" placeholder="search by name" id="search-name">
</div>
<div class="col-md-6 mt-5">
    <input type="text" class="form-control bg-black text-white " maxlength="1" placeholder="search by first letter" id="search-letter">
</div>

</div>
<div class="row" id="searchdisplay">
    
</div>
`
let searchName = document.getElementById("search-name");
searchName.addEventListener("keyup" , function(){
    let searcaData =searchName.value;
    // console.log(searcaData);
    // console.log(searchName.value);
    response(searcaData);
})


async function response(el){

    let data = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${el}`)
    let searchData = await data.json();
    // console.log(searchData);
    display(searchData);


}

let searchinfo = document.getElementById("searchdisplay");


function display(data){
    // console.log(data);
    let searchFinalData = data.meals;
    console.log(searchFinalData);
    let cartona= "";
    for (let i = 0; i < searchFinalData.length; i++) {
        cartona += `
        <div class="col-md-3 position-relative overflow-hidden mt-3" id="layer-group">
        <div class="img ">
            <img src="${searchFinalData[i].strMealThumb}" alt="">
        </div>
        <div class="layer position-absolute d-flex "> <h2>${searchFinalData[i].strMeal}</h2> </div>
    </div>
    `
        
    }
    searchinfo.innerHTML = cartona;
}

let searchByLetter = document.getElementById("search-letter");
searchByLetter.addEventListener("keyup" , function(){
    let searchLetter =searchByLetter.value;
    // console.log(searchLetter);
    responeLetter(searchLetter);
})


async function responeLetter(el){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${el}`)
    let finalDataLetter =await data.json();
    // console.log(finalDataLetter);
    displayLetterData(finalDataLetter);
}

function displayLetterData(data){
    let allData = data.meals;
    // console.log(allData.length);
    let cartona ="";
    for (let i = 0; i < allData.length; i++) {
        cartona += ` <div class="col-md-3 position-relative overflow-hidden mt-3" id="layer-group">
        <div class="img ">
            <img src="${allData[i].strMealThumb}" alt="">
        </div>
        <div class="layer position-absolute d-flex "> <h2>${allData[i].strMeal}</h2> </div>
    </div>`
        
    }
    searchinfo.innerHTML = cartona;
}



})






$("#categories").on("click", function(){
    $.ajax({
        type: "get",
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
        data: {},
        dataType: "json",
        success: function (response) {
            let cartona = "";
            // console.log(response.categories.length);
            for (let i = 0; i < response.categories.length; i++) {


                
                cartona += `<div class="col-md-3 position-relative overflow-hidden mt-3" id="layer-group">
                <div class="img ">
                    <img src="${response.categories[i].strCategoryThumb}" alt="" >
                </div>
                <div class="layer position-absolute text-center "> <h2 id="h2">${response.categories[i].strCategory}</h2> 
                <p> ${response.categories[i].strCategoryDescription} </p>
                </div>
            </div>`
            }
            mealsShow.innerHTML = cartona;


            

            // -------------------------- display the data by clicking on the h2 ------------------------------------------




            $(".layer").on("click" , function(e){
                // console.log(e.target.textContent);
                let el = e.target.textContent;
                // console.log(el);
                responsee(el);
                async function responsee(element){
                    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${element}`);
                    let finalData = await data.json();
                    // console.log(finalData.length);  
                    displayGategoriesData(finalData);              
                }
            })
            
            function  displayGategoriesData(data){
                // let dataa = [data];
                console.log(data.meals[5].strMeal);
                let cartona= ""
                for (let i = 0; i < data.meals.length; i++) {
                    cartona += `<div class="col-md-3 position-relative overflow-hidden mt-3" id="layer-group">
                    <div class="img ">
                        <img src="${data.meals[i].strMealThumb}" alt="" >
                    </div>
                    <div class="layer position-absolute text-center "> <h2 id="h2">${data.meals[i].strMeal}</h2>
                    </div>
                </div>`
                }
                // console.log(data.meals);
                // console.log(cartona);
                mealsShow.innerHTML = cartona;
            }


        }
    });
})


$("#area").on("click" , function(){
    mealsShow.innerHTML = "";
    $.ajax({
        type: "get",
        url: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
        data: {},
        dataType: "json",
        success: function (response) {
            // console.log(response.meals[3].strArea);
            let cartona = "";
            for (let i = 0; i < response.meals.length; i++) {
                cartona += `
                <div class="col-md-3 mt-3 text center text-white" id="layer-group">
                    <div class="img" >
                        <i class="fa-solid fa-house-laptop fs-1 icon" id="img"></i>
                    </div>
                    <h2 id="img"> ${response.meals[i].strArea}</h2>
                    </div>
                `
            }
            // console.log(cartona);
            mealsShow.innerHTML = cartona;

            mealsShow.addEventListener("click" , function(e){
                let elemnt = e.target.textContent;
                console.log(elemnt);
                response(elemnt);

                async function response(el){
                    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${el}`)
                    let finalData= await data.json();
                    console.log(finalData);
                    display(finalData);
                }

                function display(data){
                    let cartona ="";
                    for (let i = 0; i < data.meals.length; i++) {
                        cartona += `
                        <div class="col-md-3 position-relative overflow-hidden mt-3" id="layer-group">
                    <div class="img ">
                        <img src="${data.meals[i].strMealThumb}" alt="" >
                    </div>
                    <div class="layer position-absolute text-center "> <h2 id="h2">${data.meals[i].strMeal}</h2>
                    </div>
                </div>
                        `
                    }
                    mealsShow.innerHTML = cartona;
                }
            })

            
        
            
        }
    });
})


$("#ingredients").on("click" , function(){
    mealsShow.innerHTML="";
    $.ajax({
        type: "get",
        url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
        data: {},
        dataType: "json",
        success: function (response) {
            console.log(response);
            let cartona = "";
            for (let i = 0; i < 25; i++) {
                cartona += `
                <div class="col-md-3 position-relative overflow-hidden text-center text-white mt-3" id="layer-group">
                    <div class="img ">
                    <i class="fa-solid fa-drumstick-bite icon fs-1"></i>                 
                    </div>
                    <h2> ${response.meals[i].strIngredient} </h2>
                    <p maxlength="100" id="discrip"> ${response.meals[i].strDescription}</p>
                </div>
                `
            }
            mealsShow.innerHTML = cartona
            
        }
    });
})




// $("#search").on("click" , function(){
//     window.location.href = "search.html"
// })
// $("#categories").on("click" , function(){
//     window.location.href = "categories.html"
// })