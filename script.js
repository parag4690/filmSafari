const input = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const movieList = document.querySelector(".movieList");
const items = document.querySelector(".items");
const loading = document.querySelector(".loading");
const logo = document.querySelector(".logo");
let str = "abcdefghijklmnopqrstuvwxyz";





console.log(searchBtn);
console.log(input);
//

let imageUrl = [];
let ids = [];
let names = [];
let cast = [];
let year = [];
let rank = [];
const check = new Map();

const options = {
	method: 'GET', // Specifies the HTTP request , take data from some specific resource 
	headers: { // key value obj
		'X-RapidAPI-Key': 'c5eaf7e1aamshd0f69459a8f9045p1a833bjsn413a10e061a4',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' // spcefies the domain
	}
};

searchBtn.addEventListener("click", () => {
  let inputVal = input.value;
  console.log(inputVal);
  inputVal = inputVal.trim();
  (ids = []), (names = []), (cast = []), (year = []), (rank = []);
  imageUrl = [];
  if (inputVal == "") {
    movieList.innerHTML="";
    noMovie();
    return;
  }
  movieList.innerHTML = "";
  renderData(inputVal);
});



async function renderData(inputVal) {
  let urlStr = "";
  let size = inputVal.length;
  for (let i = 0; i < size; i++) {
    if (inputVal[i] == " ") {
      urlStr += "%20";
    } else {
      urlStr += inputVal[i];
    }
  }
  const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${urlStr}`;
  console.log(url);
  try {
    movieList.classList.add("active");
    loading.classList.remove("active");
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(" priya mitr a" + result);
    loading.classList.add("active");
    movieList.classList.remove("active");

    console.log(result);
    //
    for (let i = 0; i < result.d.length; i++) {
      ids.push(result.d[i].id);
    //   if(result.d[i].i?)
      imageUrl.push(result.d[i].i?.imageUrl);
      names.push(result.d[i].l);
      rank.push(result.d[i].rank);
      cast.push(result.d[i].s);
      year.push(result.d[i].y);
      console.log(result.d[i].s);
    }
    //
    movies();
  } catch (error) {
    console.error(error);
  }
}

const movies = () => {
  for (let i = 0; i < ids.length; i++) {
    const con = document.createElement("div");
    const image = document.createElement("img");
    if(imageUrl[i]!=undefined){
       image.src = `${imageUrl[i]}`;
    }
    else{
        image.src = `https://th.bing.com/th/id/OIP.En3KmlV99-mQsUaxThzPeQAAAA?w=196&h=173&c=7&r=0&o=5&dpr=1.3&pid=1.7`;
    }
    const content = document.createElement("div");
    const movieName = document.createElement("h1");
    const summery = document.createElement("div");
    const summery2 = document.createElement("div");
    const summery3 = document.createElement("div");

    const btn = document.createElement("button");
    content.appendChild(movieName);
    content.appendChild(summery);
    content.appendChild(summery2);
    content.appendChild(summery3);
    content.appendChild(btn);
    con.appendChild(image);
    con.appendChild(content);
    //
    movieName.innerText = `${names[i]}`;
    summery.innerHTML = ` <b style="color:black; font-weight:900">Cast: </b>  ${cast[i]}`;
    summery2.innerHTML = ` <b style="color:black; font-weight:900">Rank: </b>  ${rank[i]}`;
    summery3.innerHTML = ` <b style="color:black; font-weight:900">Year: </b>  ${year[i]!=undefined?year[i]:2003}`;

    btn.innerText = "Add to Favourite";
    con.id = ids[i];
    con.classList.add("con");
    image.classList.add("pic");
    content.classList.add("content");
    btn.classList.add("addFav");
    summery.classList.add("summery");
    summery2.classList.add("summery");
    summery3.classList.add("summery");

    movieList.appendChild(con);
  }
};

movieList.addEventListener("click", (event) => {
  //    console.log(event.target.parentNode.parentNode.firstElementChild);
  const Url = event.target.parentNode.parentNode.firstElementChild.src;
  const f_name = event.target.parentNode.firstElementChild.innerText;
  const movie_id = event.target.parentNode.parentNode.id;
  console.log(movie_id);

  if(check.has(movie_id)==false){

  const m = document.createElement("div");
  m.innerHTML = `
   <div class="dub">
       <img class="fav-pic" src=${Url} alt="" >
       <p>${f_name}</p>
   </div>
<button class="remove-fav">remove</button>
`;
  m.classList.add("fav-movie");
  m.id=movie_id;
  items.appendChild(m);
  check.set(movie_id , true);

  }
});

items.addEventListener("click", (event) => {
  console.log(event.target.parentNode);
  check.delete(event.target.parentNode.id);
  if(event.target.classList.contains("remove-fav")){
  event.target.parentNode.remove();
  }
});

const noMovie = ()=>{
    let intial = "";
    for(let i=0; i<4; i++){
        let idx = Math.floor(Math.random()*25);
        console.log(idx);
        intial+=str[idx];
    }
    console.log(intial);
    renderData(intial);
};

logo.addEventListener("click" , ()=>{
    movieList.innerHTML="";
    (ids = []), (names = []), (cast = []), (year = []), (rank = []);
    imageUrl = [];
    noMovie();
})
  
renderData("rab");


