import{a as p,i as n,S as f}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const y="https://pixabay.com/api/",L="48906528-865b601cba228060b80f58b51",E=40;function g(e){const r={key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E};return p.get(y,{params:r}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function b(e){const{webformatURL:r,largeImageURL:s,tags:l,likes:t,views:o,comments:a,downloads:u}=e;return`<li class="gallery-item">
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
                            <p>${o}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${a}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${u}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function v(e){return e.map(b).join("")}const i={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const m=40;i.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){n.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}i.container.innerHTML="",i.loader.classList.remove("hidden"),i.loadMoreBtn.classList.add("hidden"),d=1;try{const r=await g(c,d,m);if(r.hits.length===0){n.error({title:"Error",message:"No images found. Try again!",position:"topRight"});return}h(r.hits),r.hits.length===m&&i.loadMoreBtn.classList.remove("hidden")}catch{n.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{i.loader.classList.add("hidden"),e.target.reset()}});i.loadMoreBtn.addEventListener("click",async()=>{d+=1,i.loader.classList.remove("hidden");try{const e=await g(c,d,m);if(e.hits.length===0){n.error({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.loadMoreBtn.classList.add("hidden");return}h(e.hits),e.hits.length<m&&i.loadMoreBtn.classList.add("hidden")}catch{n.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{i.loader.classList.add("hidden")}});function h(e){const r=v(e);i.container.insertAdjacentHTML("beforeend",r),w.refresh()}const w=new f(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
