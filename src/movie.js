export async function getCards(searchInput) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmNlMDgxODZlYzU4OTNmOGExYjExMWJjMmRkZDhjOCIsInN1YiI6IjY2MjhmNGQ2Mzc4MDYyMDE2NWRhNmI4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-m9qW7ld2ivw1TIijs04VXXbLjlQm2b9ZGdtuOWPWE"
    }
  };

  // 영화 데이터 가져오기
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      let movies = response["results"];

      // 검색어 있을 경우
      if (searchInput) {
        let searchedMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchInput));

        showCards(searchedMovies);
      }
      // 검색어 없을 경우
      else {
        showCards(movies);
      }
    })
    .catch((err) => console.error(err));

  // 영화 카드 보여주기
  function showCards(arr) {
    let cardList = document.querySelector("#cardList");
    cardList.innerHTML = "";

    // 검색 결과 있을 경우
    if (arr.length != 0) {
      arr.forEach((arr) => {
        // loop의 경우 변수에 먼저 값을 할당해 주는 게 좋은가요?
        let id = arr["id"];
        let title = arr["title"];
        let overview = arr["overview"];
        let posterPath = `https://image.tmdb.org/t/p/w500${arr["poster_path"]}`;
        let voteAverage = arr["vote_average"];

        // 아니면 아래 let card 안에서 ${arr["id"]}같이 값을 바로 줘도 괜찮나요?
        let card = `
        <li id="card" data-id="${id}">
          <img src="${posterPath}" alt="movie image" />
          <p id="movieTitle">${title}</p>
          <p id="movieOverview">${overview}</p>
          <p id="movieRate">⭐️ Rating : ${voteAverage} ⭐️</p>
        </li>`;

        cardList.insertAdjacentHTML("beforeend", card);
        cardList.addEventListener("click", handleClickCard);
      });
    }
    // 검색 결과 없을 경우
    else {
      let msg = "<div id='emptyMsg'>No matching search results</div>";

      cardList.insertAdjacentHTML("beforeend", msg);
    }

    // 카드 클릭 시 alert 창에 영화 ID 표시
    function handleClickCard(event) {
      // 카드 밖이면 나가기
      if (event.target === cardList) return;
      // 카드 클릭 시
      if (event.target.matches("#card")) {
        alert(`Movie ID : ${event.target.dataset.id}`);
      }
      // 카드의 자식 태그 클릭 시 부모의 id로 접근
      else {
        alert(`Movie ID : ${event.target.parentNode.dataset.id}`);
      }
    }
  }
}
