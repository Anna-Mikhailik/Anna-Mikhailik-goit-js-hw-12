import{a as f,S as y,i as n}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const L="https://pixabay.com/api/",w="48906528-865b601cba228060b80f58b51",P=40;function h(t){const r={key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P};return f.get(L,{params:r}).then(i=>i.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):i.data.hits).catch(i=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function b(t){const{webformatURL:r,largeImageURL:i,tags:c,likes:e,views:o,comments:a,downloads:p}=t;return`<li class="gallery-item">
                <a href="${i}" class="gallery-link">
                    <img src="${r}" alt="${c}" class="gallery-image" />
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
                            <p>${a}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${p}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function v(t){return t.map(b).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let d="",l=1;const m=40;let g=0;const E=new y(".gallery a",{captionsData:"alt",captionDelay:250});s.form.addEventListener("submit",async t=>{if(t.preventDefault(),d=t.target.elements.text.value.trim(),!d){n.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s.container.innerHTML="",s.loadMoreBtn.classList.add("hidden"),s.loader.classList.remove("hidden"),l=1;try{const r=await h(d,l,m);if(g=r.totalHits,r.hits.length===0){n.error({title:"Error",message:"No images found. Try another query!",position:"topRight"});return}u(r.hits),g>m&&s.loadMoreBtn.classList.remove("hidden")}catch{n.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{s.loader.classList.add("hidden"),t.target.reset()}});s.loadMoreBtn.addEventListener("click",async()=>{l+=1,s.loader.classList.remove("hidden");try{const t=await h(d,l,m);u(t.hits);const r=Math.ceil(g/m);l>=r&&(s.loadMoreBtn.classList.add("hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{s.loader.classList.add("hidden")}});function u(t){s.container.insertAdjacentHTML("beforeend",v(t)),E.refresh()}
//# sourceMappingURL=index.js.map
