let deleteButton = document.querySelector("#delete");
let form = document.getElementById('new-ramen')
let updatedList=[]
let imageDetail=document.querySelector(".detail-image")
let rName=document.querySelector('.name')
let rRestaurant=document.querySelector('.restaurant')
let rRating=document.getElementById('rating-display')
let rComment=document.getElementById('comment-display')
let ramenList = [];

fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
        ramenList = ramens;
        imageRenderWithListener(ramens)
    })

function imageRenderWithListener(ramen) {
            imageDetail.src= ramen[0].image
            rName.textContent= ramen[0].name
            rRestaurant.textContent = ramen[0].restaurant
            rRating.textContent = ramen[0].rating
            rComment.textContent = ramen[0].comment
    
        ramen.forEach(function(ramen) {
        let menu = document.getElementById("ramen-menu")
        let img = document.createElement('img')
        img.src = ramen.image
        menu.append(img)
        img.addEventListener('click',function(){
            imageDetail.src = ramen.image
            rName.textContent = ramen.name
            rRestaurant.textContent = ramen.restaurant
            rRating.textContent = ramen.rating
            rComment.textContent = ramen.comment
            
            deleteButton.addEventListener("click", function () {
                let newRamenList = ramenList.filter(
                  (keepRamen) => keepRamen.id !== ramen.id
                );
                ramenList = newRamenList;

                imageRenderWithListener(newRamenList);
              });

        });
    })

}


form.addEventListener("submit",(event=>{
    event.preventDefault();
    let newRamen={
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target["new-comment"].value
    }
    
    //POST new Ramen to json upon submitting
    const post = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newRamen)
    }
    fetch("http://localhost:3000/ramens",post)
        .then(response => response.json())
        .then(json =>imageRenderWithListener(json))
    
    
    //PATCH new Ramen to json upon submitting
    fetch(`http://localhost:3000/ramens/${newRamen.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(json =>imageRenderWithListener(json))
      
    //render it on the page upon submitting
    imageRenderWithListener([newRamen])

})

)






//    fetch(`http://localhost:3000/ramens/${currentRamen}`, {
//        method: 'PATCH',
//        headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        },
//        body: JSON.stringify(ramenDataObject)
//    }).then(response => response.json())
//    .then(json => console.log(json,json.name))


// })
