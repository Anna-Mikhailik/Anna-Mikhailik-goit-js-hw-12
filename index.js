import{a as y,i as c,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const b="https://pixabay.com/api/",v="48906528-865b601cba228060b80f58b51",w=40;function m(e){const r={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w};return y.get(b,{params:r}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function E(e){const{webformatURL:r,largeImageURL:s,tags:n,likes:t,views:o,comments:a,downloads:p}=e;return`<li class="gallery-item">
                <a href="${s}" class="gallery-link">
                    <img src="${r}" alt="${n}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${t}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${o}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${a}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${p}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function S(e){return e.map(E).join("")}const i={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let l="",d=1;const u=40;let g=0;i.form.addEventListener("submit",async e=>{if(e.preventDefault(),l=e.target.elements.text.value.trim(),!l){c.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}i.container.innerHTML="",i.loader.classList.remove("hidden"),i.loadMoreBtn.classList.add("hidden"),d=1;try{const{hits:r,totalHits:s}=await m(l,d,u);g=s,h(r),f()}catch{c.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{i.loader.classList.add("hidden"),e.target.reset()}});i.loadMoreBtn.addEventListener("click",async()=>{d+=1,i.loader.classList.remove("hidden");try{const{hits:e}=await m(l,d,u);h(e),f(),R()}catch{c.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{i.loader.classList.add("hidden")}});function h(e){const r=S(e);i.container.insertAdjacentHTML("beforeend",r),q.refresh()}function f(){i.container.querySelectorAll(".gallery-item").length>=g?(i.loadMoreBtn.classList.add("hidden"),c.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):i.loadMoreBtn.classList.remove("hidden")}function R(){const e=i.container.querySelector(".gallery-item");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}const q=new L(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
