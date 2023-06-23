import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { addToCartIcon, cart } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { useCartContext } from "../context/CartContext";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import Cart from "../components/Cart";
import Submit from "../components/Submit";
import Success from "../components/Success";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  // const [qty, setQty] = useState(1);
  // const [cartItem, setCartItem] = useState({});

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const { setLogo } = useCartContext();

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5 flex"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-4"
            />
            <button className="download-btn">
              <img
                src={cart}
                alt="cart"
                className="w-3/5 h-3/5 object-contain"
                onClick={() => (state.cart = true)}
              />
            </button>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            {/* <button className="download-btn" onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt="download_image"
                className="w-3/5 h-3/5 object-contain"
              />
            </button> */}

            {/* <p>Please choose the type of the shirt: </p> */}
            {/* <input
              defaultChecked
              type="radio"
              name="type"
              id="terra"
              value="terra"
            />
            <div>
              <img
                src={longShirt}
                alt="longshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("terra").click();
                }}
              />
              Terra
            </div>
            <input type="radio" name="type" id="puma" value="puma" />
            <div>
              <img
                src={shortShirt}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("puma").click();
                }}
              />
              Puma
            </div>
            <input type="radio" name="type" id="adidas" value="adidas" />
            <div>
              <img
                src={adidas}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("adidas").click();
                }}
              />
              Adidas
            </div>
            <input type="radio" name="type" id="nike" value="nike" />
            <div>
              <img
                src={nike}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("nike").click();
                }}
              />
              Nike
            </div>
            <input type="radio" name="type" id="tahari" value="tahari" />
            <div>
              <img
                src={tahari}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("tahari").click();
                }}
              />
              Tahari
            </div>

            <input type="radio" name="type" id="tentree" value="tentree" />
            <div>
              <img
                src={tentree}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("tentree").click();
                }}
              />
              Tentree
            </div>
            <input type="radio" name="type" id="taylor" value="taylor" />
            <div>
              <img
                src={taylor}
                alt="shortshirt"
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  document.getElementById("taylor").click();
                }}
              />
              Taylor
            </div> */}
            {/* <input
              type="text"
              className="w-[200px] outline-none rounded-lg p-2"
              id="type"
            />
            <button className="download-btn" onClick={() => setQty(qty + 1)}>
              <AiOutlinePlus className="w-3/5 h-3/5 object-contain" />
            </button>
            <button className="download-btn">{qty}</button>
            <button
              className="download-btn"
              onClick={() => (qty !== 1 ? setQty(qty - 1) : setQty(1))}
            >
              <AiOutlineMinus className="w-3/5 h-3/5 object-contain" />
            </button> */}
            {/* <select
              name="size"
              id="size"
              placeholder="Select Size"
              className="rounded-lg p-2 outline-none"
              defaultValue="L"
            >
              <option value="SM">SM</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select> */}
            <button
              className="download-btn"
              onClick={() => {
                // setCartItem({
                //   photo: document.querySelector("canvas").toDataURL(),
                //   type: document.querySelector("input[name='type']:checked")
                //     .value,
                //   quantity: qty,
                //   size: document.querySelector("select").value,
                // });
                // addToCart(cartItem);
                setLogo(document.querySelector("canvas").toDataURL());
                localStorage.setItem(
                  "logo",
                  JSON.stringify(document.querySelector("canvas").toDataURL())
                );
                state.cart = true;
              }}
            >
              <img
                src={addToCartIcon}
                alt="cart"
                className="w-3/5 h-3/5 object-contain"
              />
            </button>
          </motion.div>
        </>
      )}
      {snap.cart && <Cart />}
      {snap.submit && <Submit />}
      {snap.success && <Success />}
    </AnimatePresence>
  );
};

export default Customizer;
