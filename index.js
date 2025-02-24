import{a as p,i as m,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const L="https://pixabay.com/api/",v="48906528-865b601cba228060b80f58b51",E=40;function u(r){const i={key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E};return p.get(L,{params:i}).then(a=>a.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):a.data.hits).catch(a=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function b(r){const{webformatURL:i,largeImageURL:a,tags:l,likes:e,views:o,comments:n,downloads:f}=r;return`<li class="gallery-item">
                <a href="${a}" class="gallery-link">
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
                            <p>${f}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function w(r){return r.map(b).join("")}const t={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const h=40;let s=[];t.form.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements.text.value.trim(),!c){m.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}t.container.innerHTML="",t.loader.classList.remove("hidden"),t.loadMoreBtn.classList.add("hidden"),d=1,s=[];try{s=await u(c,d,h),g(s.slice(0,20)),s.length>20&&t.loadMoreBtn.classList.remove("hidden")}catch{m.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{t.loader.classList.add("hidden"),r.target.reset()}});t.loadMoreBtn.addEventListener("click",async()=>{const r=s.slice(t.container.children.length,t.container.children.length+20);if(g(r),t.container.children.length>=s.length){d+=1,t.loader.classList.remove("hidden");try{s=await u(c,d,h),g(s.slice(0,20)),s.length>20?t.loadMoreBtn.classList.remove("hidden"):t.loadMoreBtn.classList.add("hidden")}catch{m.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{t.loader.classList.add("hidden")}}});function g(r){const i=w(r);t.container.insertAdjacentHTML("beforeend",i),P.refresh()}const P=new y(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
