// Set The value
const progressDiv = document.querySelector(".progress");
let progress = document.querySelector(".progress-bar");
progress.ariaValueNow = 0;
progress.style.width = "0%";

let contentForm = document.querySelector(".form-control");

contentForm.addEventListener("keyup", myFunc);

export function myFunc(e) {
  let contentLength = contentForm.value.length;
  contentLength === 0
    ? (progressDiv.hidden = true)
    : (progressDiv.hidden = false);
  progress.ariaValueNow = contentLength;
  progress.style.width = `${(contentLength / 280) * 100}%`;
  if (contentLength >= 260 && contentLength <= 280) {
    progress.classList.add("-active");
  } else {
    progress.classList.remove("-active");
  }
}
