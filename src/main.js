import { getCards } from "./movie.js";

// 검색창 자동 커서
let input = document.querySelector("#searchInput");
input.focus();

// 엔터 키 누를 시 검색 버튼 작동
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

// 영화 검색
let form = document.querySelector("#searchForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCards(input.value);
});

getCards();
// getCards가 두 번 호출되는 게 마음에 안 드는데 어떻게 수정해야 할지 모르겠습니다..!
// 애초에 구조적으로 잘못된 걸까요?!
