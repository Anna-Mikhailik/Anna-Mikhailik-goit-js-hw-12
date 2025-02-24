import{a as y,i as d,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",b="48906528-865b601cba228060b80f58b51",E=40;function u(r){const i={key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E};return y.get(v,{params:i}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function w(r){const{webformatURL:i,largeImageURL:s,tags:l,likes:e,views:o,comments:n,downloads:p}=r;return`<li class="gallery-item">
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
                            <p>${p}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function P(r){return r.map(w).join("")}const t={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",m=1;const f=40;let a=[],g=0;t.form.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements.text.value.trim(),!c){d.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}t.container.innerHTML="",t.loader.classList.remove("hidden"),t.loadMoreBtn.classList.add("hidden"),m=1,a=[];try{const{images:i,totalHits:s}=await u(c,m,f);g=s,a=i,h(a.slice(0,20)),a.length>20&&t.loadMoreBtn.classList.remove("hidden")}catch{d.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{t.loader.classList.add("hidden"),r.target.reset()}});t.loadMoreBtn.addEventListener("click",async()=>{const r=t.container.children.length,i=a.slice(r,r+20);if(h(i),t.container.children.length>=a.length&&t.container.children.length<g){m+=1,t.loader.classList.remove("hidden");try{const{images:s}=await u(c,m,f);a=s,h(a.slice(0,20)),t.container.children.length>=g?(t.loadMoreBtn.classList.add("hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a.length>20&&t.loadMoreBtn.classList.remove("hidden")}catch{d.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{t.loader.classList.add("hidden")}}});function h(r){const i=P(r);t.container.insertAdjacentHTML("beforeend",i),R.refresh()}const R=new L(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
