// const base = document.getElementById("base");
// const keyValueTemplate = document.querySelector(".key-value");
// const l1=document.getElementById("label")
// l1.contentEditable=true



// function getElementsOfTemplate(element) {
//   return {
//     container: element.querySelector(".key-value-container"),
//     valueEl: element.querySelector(".value"),
   
//     addEl: element.querySelector(".add"),
//     removeEl: element.querySelector(".remove"),
//     arrowEl: element.querySelector(".arrow"),
//   };
// }

// function getNode() {
//   const keyValueNode = keyValueTemplate.content.cloneNode(true);
//   const { container, valueEl, addEl, removeEl, arrowEl } =
//     getElementsOfTemplate(keyValueNode);

//   arrowEl.addEventListener("click", () => {
//     arrowEl.classList.toggle("open");
//   });

//   valueEl.addEventListener("input", () => {
//     if (valueEl.value === "") {
//       addEl.style.display = "none";
//     } else {
//       addEl.style.display = "inline";
//     }
//   });

//   addEl.addEventListener("click", () => {
    
//     valueEl.style.display = "none";

//     const subItem = document.createElement("div");
//     subItem.classList.add("sub-item");
//     subItem.appendChild(getNode());

//     container.appendChild(subItem);
//     arrowEl.classList.remove("hide");
//     arrowEl.classList.add("open");
//   });

//   removeEl.addEventListener("click", () => {
//     const subItemEl = container.parentElement;
//     const parentEl = subItemEl.parentElement;

//     subItemEl.remove();
//     if (!parentEl.querySelector(".sub-item")) {
//       parentEl.querySelector(".value").style.display = "inline";
//       parentEl.querySelector(".arrow").classList.remove("open");
//       parentEl.querySelector(".arrow").classList.add("hide");
//     }
//   });

//   return keyValueNode;
// }



// base.appendChild(getNode());


//       function showContent() {
//   var temp = document.getElementsByTagName("template")[0];
//   var clon = temp.content.cloneNode(true);
//   document.body.appendChild(clon);
 
// }




















const base = document.getElementById("base");
const addNewExpander = document.querySelector(".keyValueExpander");
const keyValueTemplate = document.querySelector(".key-value");
const getJsonTemplate = document.querySelector(".get-json");

function getJSON(container) {
  const object = {};

  const keyEl = container.querySelector(".key");
  const valueEl = container.querySelector(".key + .value");

  if (keyEl && keyEl.value) {
    if (valueEl.style.display !== "none") object[keyEl.value] = valueEl.value;
    else {
      let subItem = container.querySelector(".sub-item");
      const subItems = [subItem];
      while (subItem.nextElementSibling) {
        subItems.push(subItem.nextElementSibling);
        subItem = subItem.nextElementSibling;
      }
      let obj = {};
      subItems.forEach((subItem) => {
        obj = { ...obj, ...getJSON(subItem) };
      });
      object[keyEl.value] = obj;
    }
  }
  return object;
}

function getElementsOfTemplate(element) {
  return {
    container: element.querySelector(".key-value-container"),
    valueEl: element.querySelector(".value"),
    addEl: element.querySelector(".add"),
    removeEl: element.querySelector(".remove"),
    arrowEl: element.querySelector(".arrow"),
  };
}

function getNode() {
  const keyValueNode = keyValueTemplate.content.cloneNode(true);
  const { container, valueEl, addEl, removeEl, arrowEl } =
    getElementsOfTemplate(keyValueNode);

  arrowEl.addEventListener("click", () => {
    arrowEl.classList.toggle("open");
  });

  addEl.addEventListener("click", () => {
    valueEl.style.display = "none";

    const subItem = document.createElement("div");
    subItem.classList.add("sub-item");
    subItem.appendChild(getNode());

    container.appendChild(subItem);
    arrowEl.classList.remove("hide");
    arrowEl.classList.add("open");
  });

  removeEl.addEventListener("click", () => {
    const subItemEl = container.parentElement;
    const parentEl = subItemEl.parentElement;

    subItemEl.remove();
    if (!parentEl.querySelector(".sub-item")) {
      parentEl.querySelector(".value").style.display = "inline";
      parentEl.querySelector(".arrow").classList.remove("open");
      parentEl.querySelector(".arrow").classList.add("hide");
    }
  });

  return container;
}

addNewExpander.addEventListener("click", () => {
  const container = base.appendChild(getNode());
  const getJSONButton = document.createElement("button");
  getJSONButton.textContent = "Get JSON";
  getJSONButton.classList.add("get-json-button");
  base.appendChild(getJSONButton);

  getJSONButton.addEventListener("click", () =>
    console.log(JSON.stringify(getJSON(container)))
  );
});

addNewExpander.click();