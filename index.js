import{a as y,i as a,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const b="https://pixabay.com/api/",w="48906528-865b601cba228060b80f58b51",E=40;function m(e){const r={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E};return y.get(b,{params:r}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function v(e){const{webformatURL:r,largeImageURL:s,tags:l,likes:t,views:i,comments:n,downloads:p}=e;return`<li class="gallery-item">
                <a href="${s}" class="gallery-link">
                    <img src="${r}" alt="${l}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${t}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${i}</p>
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
            </li>`}function R(e){return e.map(v).join("")}const o={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const g=40;let u=0;o.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){a.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}o.container.innerHTML="",o.loader.classList.remove("hidden"),o.loadMoreBtn.classList.add("hidden"),d=1;try{const{hits:r,totalHits:s}=await m(c,d,g);if(u=s,r.length===0){a.error({title:"Error",message:"No images found. Try again!",position:"topRight"});return}h(r),f()}catch{a.error({title:"Error",message:"Something went wrong. Try again later!",position:"topRight"})}finally{o.loader.classList.add("hidden"),e.target.reset()}});o.loadMoreBtn.addEventListener("click",async()=>{d+=1,o.loader.classList.remove("hidden");try{const{hits:e}=await m(c,d,g);if(e.length===0){o.loadMoreBtn.classList.add("hidden"),a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}h(e),f(),S()}catch{a.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{o.loader.classList.add("hidden")}});function h(e){const r=R(e);o.container.insertAdjacentHTML("beforeend",r),q.refresh()}function f(){o.container.querySelectorAll(".gallery-item").length>=u?(o.loadMoreBtn.classList.add("hidden"),a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):o.loadMoreBtn.classList.remove("hidden")}function S(){const e=o.container.querySelector(".gallery-item");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}const q=new L(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
