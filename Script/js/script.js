const imageFileEl = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextEl = document.querySelector("#topTextInput");
const bottomTextEl = document.querySelector("#bottomTextInput");
const downloadEl = document.querySelector("#download");

let image;
let download;

imageFileEl.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileEl.files[0]);
  // renderMemeCanvas()
  image = new Image();
  image.src = imageDataUrl;
  image.addEventListener(
    "load",
    () => {
      renderMemeCanvas(canvas, image, topTextEl.value, bottomTextEl.value);
    },
    { once: true }
  );
});

topTextEl.addEventListener("input", () => {
  renderMemeCanvas(canvas, image, topTextEl.value, bottomTextEl.value);
});
bottomTextEl.addEventListener("input", () => {
  renderMemeCanvas(canvas, image, topTextEl.value, bottomTextEl.value);
});
const downloadHandler = function () {
  console.log("clicked");
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("meme").toDataURL();
  link.click();
};

const renderMemeCanvas = (canvas, image, topText, bottomText) => {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  //   Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  //   top text add
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  //   add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);

  downloadEl.classList.remove("hidden");
};
