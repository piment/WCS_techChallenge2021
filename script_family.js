const cards = document.getElementsByClassName("card");
for (let card of cards) {
  card.addEventListener("mouseenter", (event) => {
    event.preventDefault();
    event.target.getElementsByTagName('img')[0].classList.add("card_img_mvt");
    event.target.getElementsByClassName('member_name')[0].setAttribute('style', "display: block");

  });
  card.addEventListener("mouseleave", (event) => {
    event.preventDefault();
    event.target.getElementsByTagName('img')[0].classList.remove("card_img_mvt");
    event.target.getElementsByClassName('member_name')[0].setAttribute('style', "display: none");
  });
}

