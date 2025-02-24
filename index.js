import{a as L,i as d,S as b}from"./assets/vendor-DEenWwFD.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",E="48906528-865b601cba228060b80f58b51",w=40;function h(t){const i={key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w};return L.get(v,{params:i}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function P(t){const{webformatURL:i,largeImageURL:s,tags:l,likes:e,views:o,comments:n,downloads:y}=t;return`<li class="gallery-item">
                <a href="${s}" class="gallery-link">
                    <img src="${i}" alt="${l}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${e}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${o}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${n}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${y}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function R(t){return t.map(P).join("")}const r={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",m=1;const u=40;let a=[],f=0;r.form.addEventListener("submit",async t=>{if(t.preventDefault(),c=t.target.elements.text.value.trim(),!c){d.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}r.container.innerHTML="",r.loader.classList.remove("hidden"),r.loadMoreBtn.classList.add("hidden"),m=1,a=[];try{const{images:i,totalHits:s}=await h(c,m,u);f=s,a=i,g(a.slice(0,20)),p()}catch{d.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{r.loader.classList.add("hidden"),t.target.reset()}});r.loadMoreBtn.addEventListener("click",async()=>{const t=r.container.children.length,i=a.slice(t,t+20);if(g(i),r.container.children.length<a.length){m+=1,r.loader.classList.remove("hidden");try{const{images:s}=await h(c,m,u);a=s,g(a.slice(0,20)),p()}catch{d.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{r.loader.classList.add("hidden")}}});function g(t){const i=R(t);r.container.insertAdjacentHTML("beforeend",i),S.refresh()}function p(){r.container.children.length>=a.length?r.container.children.length>=f&&(r.loadMoreBtn.classList.add("hidden"),d.info({title:"Info",message:"You've reached the end of the search results.",position:"topRight"})):a.length>20&&r.loadMoreBtn.classList.remove("hidden")}const S=new b(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
