const cards = document.querySelectorAll(".card__inner");

// card.addEventListener("click", function (e) {
//   card.classList.toggle('is-flipped');
// });
for (const card of cards) {
  card.addEventListener("click", function (e) {
      card.classList.toggle('is-flipped');
      console.log(e.innerText)
    });
}
