let form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  alert(
    `Hi ${name}! \rThank you for contacting us. \rWe'll give you an answer ASAP!`
  );
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
});
