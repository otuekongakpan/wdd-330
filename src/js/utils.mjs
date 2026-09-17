// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callBackFn) {

  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);

  if(callBackFn){
    callbackFn(data);
  }

}

async function loadTemplate(path){
  const res = await fetch(`../public/partials/${path}.html`);
  if(res.ok)
  {
    const data = res.text();
    return data;
  }
  
}

export async function loadHeaderFooter()
{

  const headerParent = document.getElementById('main-header') // header placeholder
  const footerParent = document.getElementById('main-footer') // footer placeholder

  const headerTemplate = await loadTemplate('header');
  const footerTemplate = await loadTemplate('footer');

  renderWithTemplate(headerTemplate, headerParent);
  renderWithTemplate(footerTemplate, footerParent);

}
