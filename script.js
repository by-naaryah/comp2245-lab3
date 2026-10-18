document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("labForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload
    const name = document.getElementById("name").value;
    message.textContent = `Thank you, ${name}! Your form has been submitted.`;
  });
});
