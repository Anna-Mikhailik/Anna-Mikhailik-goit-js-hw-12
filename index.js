import{a as p,S as f,i as n}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const y="https://pixabay.com/api/",L="48906528-865b601cba228060b80f58b51",w=40;function g(e){const r={key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w};return p.get(y,{params:r}).then(s=>s.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):s.data.hits).catch(s=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function E(e){const{webformatURL:r,largeImageURL:s,tags:l,likes:t,views:i,comments:a,downloads:u}=e;return`<li class="gallery-item">
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
                            <p>${a}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${u}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function P(e){return e.map(E).join("")}const o={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const m=40;let b=new f(".gallery a",{captionsData:"alt",captionDelay:250});o.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){n.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}o.container.innerHTML="",d=1,o.loadMoreBtn.classList.add("hidden"),o.loader.classList.remove("hidden");try{const r=await g(c,d,m);if(r.hits.length===0){n.error({title:"Error",message:"No images found. Please try a different query!",position:"topRight"});return}h(r.hits),r.hits.length===m&&o.loadMoreBtn.classList.remove("hidden")}catch{n.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{o.loader.classList.add("hidden"),e.target.reset()}});o.loadMoreBtn.addEventListener("click",async()=>{d+=1,o.loader.classList.remove("hidden");try{const e=await g(c,d,m);if(e.hits.length===0){n.error({title:"Error",message:"No more images found!",position:"topRight"}),o.loadMoreBtn.classList.add("hidden");return}h(e.hits),e.hits.length<m&&o.loadMoreBtn.classList.add("hidden")}catch{n.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{o.loader.classList.add("hidden")}});function h(e){const r=P(e);o.container.insertAdjacentHTML("beforeend",r),b.refresh()}
//# sourceMappingURL=index.js.map
