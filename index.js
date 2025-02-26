import{a as f,i as l,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const L="https://pixabay.com/api/",w="48906528-865b601cba228060b80f58b51",b=40;async function m(e,o){const i={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:b,page:o};try{return(await f.get(L,{params:i})).data}catch{return iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),{hits:[],totalHits:0}}}function E(e){const{webformatURL:o,largeImageURL:i,tags:a,likes:t,views:s,comments:n,downloads:p}=e;return`<li class="gallery-item">
                  <a href="${i}" class="gallery-link">
                      <img src="${o}" alt="${a}" class="gallery-image" />
                  </a>
                  <div class="desc">
                      <ul class="desc-wraper">
                          <li class="desc-item">
                              <h3>Likes</h3>
                              <p>${t}</p>
                          </li>
                          <li class="desc-item">
                              <h3>Views</h3>
                              <p>${s}</p>
                          </li>
                          <li class="desc-item">
                              <h3>Comments</h3>
                              <p>${n}</p>
                          </li>
                          <li class="desc-item">
                              <h3>Downloads</h3>
                              <p>${p}</p>
                          </li>
                      </ul>
                  </div>
              </li>`}function v(e){return e.map(E).join("")}const r={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.createElement("button")};r.loadMoreBtn.textContent="Load more";r.loadMoreBtn.classList.add("load-more","hidden");r.container.insertAdjacentElement("afterend",r.loadMoreBtn);let c="",d=1,u=0;r.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){l.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}r.container.innerHTML="",r.loader.classList.remove("hidden"),r.loadMoreBtn.classList.add("hidden"),d=1;try{const{hits:o,totalHits:i}=await m(c,d);if(u=i,o.length===0){l.error({title:"Error",message:"No images found. Try again!",position:"topRight"});return}g(o),h()}catch{l.error({title:"Error",message:"Something went wrong. Try again later!",position:"topRight"})}finally{r.loader.classList.add("hidden"),e.target.reset()}});r.loadMoreBtn.addEventListener("click",async()=>{d+=1,r.loader.classList.remove("hidden");try{const{hits:e}=await m(c,d);g(e),h(),B()}catch{l.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{r.loader.classList.add("hidden")}});function g(e){const o=v(e);r.container.insertAdjacentHTML("beforeend",o),M.refresh()}function h(){r.container.querySelectorAll(".gallery-item").length>=u?(r.loadMoreBtn.classList.add("hidden"),l.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):r.loadMoreBtn.classList.remove("hidden")}function B(){const e=r.container.querySelector(".gallery-item");if(e){const{height:o}=e.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}const M=new y(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
