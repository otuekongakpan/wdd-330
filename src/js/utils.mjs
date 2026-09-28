
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(`Could not parse localStorage key "${key}":`, err);
    return null;
  }
}


export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    console.warn(`setClick: no element found for "${selector}"`);
    return;
  }

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  element.addEventListener("click", callback);
}


export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) {
    console.warn("renderWithTemplate: parent element not found");
    return;
  }

  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);

  if (callback) {
    callback(data);
  }
}

async function loadTemplate(name) {
  const res = await fetch(`/partials/${name}.html`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Could not load partial "${name}" (HTTP ${res.status})`);
  }
  return res.text();
}

export async function loadHeaderFooter()
{

    const headerParent = document.getElementById("main-header");
    const footerParent = document.getElementById("main-footer");


  const headerTemplate = await loadTemplate('header');
  const footerTemplate = await loadTemplate('footer');

  renderWithTemplate(headerTemplate, headerParent);
  renderWithTemplate(footerTemplate, footerParent);

  
  // updateCartCount(); 

}

export function alertMessage(messages, scroll = true) {
  const alert = document.createElement("div");
  alert.className = "alert";

  ;
  for (const key of Object.keys(messages)) {
    const text = document.createElement("p")
    text.textContent = messages[key];
    console.log(text);
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "X";
    close.setAttribute("aria-label", "Dismiss message");
    close.addEventListener("click", () => alert.remove(this));
    text.appendChild(close);
    alert.appendChild(text);
  }
  

  const main = qs("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}


export function removeAllAlerts() {
  document.querySelectorAll(".alert").forEach(alert => alert.remove());
}
