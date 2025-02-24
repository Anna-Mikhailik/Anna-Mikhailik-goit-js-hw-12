import{a as y,i as a,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const b="https://pixabay.com/api/",w="48906528-865b601cba228060b80f58b51",R=40;function h(e){const r={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:R};return y.get(b,{params:r}).then(i=>i.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):i.data.hits).catch(i=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function v(e){const{webformatURL:r,largeImageURL:i,tags:l,likes:t,views:s,comments:n,downloads:p}=e;return`<li class="gallery-item">
                <a href="${i}" class="gallery-link">
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
            </li>`}function E(e){return e.map(v).join("")}const o={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const g=40;let m=0;o.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){a.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}o.container.innerHTML="",o.loader.classList.remove("hidden"),o.loadMoreBtn.classList.add("hidden"),d=1;try{const r=await h(c,d,g);m=r.totalHits,r.hits.length===0?a.info({title:"No Results",message:"Sorry, no images found for your search.",position:"topRight"}):(u(r.hits),f())}catch{a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{o.loader.classList.add("hidden"),e.target.reset()}});o.loadMoreBtn.addEventListener("click",async()=>{d+=1,o.loader.classList.remove("hidden");try{const e=await h(c,d,g);e.hits.length===0?(a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),o.loadMoreBtn.classList.add("hidden")):(u(e.hits),f(),P())}catch{a.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{o.loader.classList.add("hidden")}});function u(e){const r=E(e);o.container.insertAdjacentHTML("beforeend",r),S.refresh()}const S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(){const e=o.container.querySelectorAll(".gallery-item").length;e>=m?(o.loadMoreBtn.classList.add("hidden"),a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):e<m&&e%g===0&&o.loadMoreBtn.classList.remove("hidden")}function P(){const e=o.container.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
