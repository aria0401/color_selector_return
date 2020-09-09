"use strict";

window.addEventListener("load", start);

function start() {
  getColorFromUser();
}

function getColorFromUser() {
  let colorWell = document.querySelector("#selector");
  colorWell.addEventListener("input", getColorValue);
}

function getColorValue(event) {
  let selectedColor = event.target.value;
  showColorInBox(selectedColor);
  hexToRGB(selectedColor);
  return selectedColor;
}

function showColorInBox(selectedColor) {
  const viewer = document.querySelector("#viewer");
  viewer.style.backgroundColor = selectedColor;
}

function hexToRGB(color) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5), 16);
  let object = { r, g, b };
  let RGBcolor = `${r}, ${g}, ${b}`;
  rgbToHex(object);
  rgbToHsl(object);
  showingTextRgb(RGBcolor);
  return { r, g, b };
}

function rgbToHex(obj) {
  let r = obj.r.toString(16).padStart(2, "0");
  let g = obj.g.toString(16).padStart(2, "0");
  let b = obj.b.toString(16).padStart(2, "0");
  let HEXcolor = `#${r}${g}${b}`;
  showingTextHex(HEXcolor);
  return HEXcolor;
}

function rgbToHsl(obj) {
  let r = obj.r;
  let g = obj.g;
  let b = obj.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  h = h.toFixed();
  l = l.toFixed(0);
  s = s.toFixed(0);
  let HSLcolor = `${h}, ${s}%, ${l}%`;
  // hslToRgb(h, s, l);
  showingTextHsl(HSLcolor);
}

function showingTextHex(HEXcolor) {
  document.querySelector("#hex").textContent = HEXcolor;
}

function showingTextRgb(RGBcolor) {
  document.querySelector("#rgb").textContent = RGBcolor;
}

function showingTextHsl(HSLcolor) {
  document.querySelector("#hsl").textContent = HSLcolor;
}
