import { proxy } from "valtio";

const state = proxy({
  intro: true,
  cart: false,
  submit: false,
  success: false,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
