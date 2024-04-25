const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmNlMDgxODZlYzU4OTNmOGExYjExMWJjMmRkZDhjOCIsInN1YiI6IjY2MjhmNGQ2Mzc4MDYyMDE2NWRhNmI4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-m9qW7ld2ivw1TIijs04VXXbLjlQm2b9ZGdtuOWPWE",
  },
};

function createCards(arr) {
  document.getElementById("cardList").innerHTML = "";
  arr.forEach((arr) => {
    let id = arr["id"];
    let title = arr["title"];
    let overview = arr["overview"];
    let posterPath = `https://image.tmdb.org/t/p/w500${arr["poster_path"]}`;
    let voteAverage = arr["vote_average"];

    let card = `
      <div onclick="alert(${id});">
        <img src="${posterPath}" alt="영화 이미지" />
        <h3>${title}</h3>
        <p>${overview}</p>
        <p>평점 : ${voteAverage}</p>
      </div>`;

    $("#cardList").append(card);
  });
}

function getMovies() {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let word = document.getElementById("searchStr").value.toLowerCase();
      let movies = response["results"];

      if (word) {
        let searchedMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(word)
        );

        createCards(searchedMovies);
      } else {
        createCards(movies);
      }
    })
    .catch((err) => console.error(err));
}

getMovies();

// 키보드 enter 키 입력 시 검색 버튼 작동
window.load = function () {
  var input = document.getElementById("searchStr");

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchBtn").click();
    }
  });
};
