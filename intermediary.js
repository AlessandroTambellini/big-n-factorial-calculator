const btn = document.querySelector("main > button");
const inputField = document.querySelector("main > input");
const outputField = document.querySelector("p");

btn.addEventListener("click", () => {
  // f stands for factorial
  const fDec = calc_factorial(parseInt(inputField.value, 10));
  const fExp = expCast(fDec, fDec.length - 1);
  /*   const fHex = hexCast(fDec);
  const fBin = binCast(fDec);
 */
  document.querySelector("#dec-td").appendChild(document.createTextNode(fDec));
  document.querySelector("#exp-td").appendChild(document.createTextNode(fExp));
  /*   document.querySelector("#hex-td").appendChild(document.createTextNode(fHex));
  document.querySelector("#bin-td").appendChild(document.createTextNode(fBin));
 */
});

function calc_factorial(num) {
  const reversedFactorial = Module.ccall(
    "calc_factorial",
    "string",
    ["number"],
    [num]
  );
  return reversedFactorial.split("").reverse().join("");
}

function expCast(num, fractionDigits) {
  return Number.parseFloat(num).toExponential(
    fractionDigits < 10 ? fractionDigits : 9
  );
}

/* function hexCast(num) {
  //return Number.parseFloat(num).toString(16);

} */

/* function binCast(num) {
  let numBits = (parseInt(num, 10) >>> 0).toString(2);
  const numBitsLength = numBits.length;
  let nibblesStr = "";
  numBits = numBits.padStart(
    numBitsLength > 4 ? numBitsLength + (4 - (numBitsLength % 4)) : 4,
    "0"
  );
  for (let i = 1; i <= numBits.length; i++) {
    nibblesStr += numBits[i - 1];
    if (i % 4 === 0) {
      nibblesStr += " ";
    }
  }

  return nibblesStr;
} */
