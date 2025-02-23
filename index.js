import{a as p,i as d,S as f}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const y="https://pixabay.com/api/",L="48906528-865b601cba228060b80f58b51",w=40;function u(t){const r={key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w};return p.get(y,{params:r}).then(a=>a.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):a.data.hits).catch(a=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function P(t){const{webformatURL:r,largeImageURL:a,tags:l,likes:e,views:o,comments:i,downloads:h}=t;return`<li class="gallery-item">
                <a href="${a}" class="gallery-link">
                    <img src="${r}" alt="${l}" class="gallery-image" />
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
                            <p>${i}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${h}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function b(t){return t.map(P).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let n=1,c="",m=0;s.form.addEventListener("submit",async t=>{if(t.preventDefault(),c=t.target.elements.text.value.trim(),!c){d.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"});return}s.container.innerHTML="",s.loader.classList.remove("hidden"),s.loadMoreBtn.classList.add("hidden"),n=1;try{const r=await u(c,n);m=r.totalHits,g(r.hits),m>40&&s.loadMoreBtn.classList.remove("hidden")}catch{d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{s.loader.classList.add("hidden"),t.target.reset()}});s.loadMoreBtn.addEventListener("click",async()=>{n+=1,s.loader.classList.remove("hidden");try{const t=await u(c,n);g(t.hits);const r=Math.ceil(m/40);n>=r&&(s.loadMoreBtn.classList.add("hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{d.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{s.loader.classList.add("hidden")}});function g(t){const r=b(t);s.container.insertAdjacentHTML("beforeend",r),v.refresh()}const v=new f(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
