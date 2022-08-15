const btn = document.querySelector("button");
const inputField = document.querySelector("input");
const outputField = document.querySelector("p");

btn.addEventListener("click", () => {
  const factorial = calc_factorial(parseInt(inputField.value, 10));
  outputField.appendChild(document.createTextNode(factorial));
});

function calc_factorial(num) {
  const reversedFactorial = Module.ccall(
    "calc_factorial",
    "string",
    ["number"],
    [num]
  );
  console.log(reversedFactorial);
  return reversedFactorial.split("").reverse().join("");
}
