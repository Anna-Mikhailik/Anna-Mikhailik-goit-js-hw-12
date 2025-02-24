import{a as y,S as L,i as c}from"./assets/vendor-DEenWwFD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const w="https://pixabay.com/api/",E="48906528-865b601cba228060b80f58b51",b=40;function u(t){const o={key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:b};return y.get(w,{params:o}).then(a=>a.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):a.data.hits).catch(a=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function v(t){const{webformatURL:o,largeImageURL:a,tags:d,likes:e,views:r,comments:l,downloads:f}=t;return`<li class="gallery-item">
                <a href="${a}" class="gallery-link">
                    <img src="${o}" alt="${d}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${e}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${r}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${l}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${f}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function P(t){return t.map(v).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let m="",g=1;const p=40;let i=[],n=0;const R=new L(".gallery a",{captionsData:"alt",captionDelay:250});s.form.addEventListener("submit",async t=>{if(t.preventDefault(),m=t.target.elements.text.value.trim(),!m){c.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s.container.innerHTML="",g=1,n=0,i=[],s.loader.classList.remove("hidden"),s.loadMoreBtn.classList.add("hidden");try{if(i=(await u(m,g,p)).hits,i.length===0){c.error({title:"Error",message:"No images found. Try again!",position:"topRight"});return}h(),i.length>20&&s.loadMoreBtn.classList.remove("hidden")}catch{c.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{s.loader.classList.add("hidden"),t.target.reset()}});s.loadMoreBtn.addEventListener("click",async()=>{if(h(),n>=i.length){g+=1,s.loader.classList.remove("hidden");try{i=(await u(m,g,p)).hits,n=0,i.length===0?(s.loadMoreBtn.classList.add("hidden"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):h()}catch{c.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{s.loader.classList.add("hidden")}}});function h(){const t=i.slice(n,n+20),o=P(t);s.container.insertAdjacentHTML("beforeend",o),R.refresh(),n+=20,n>=i.length&&s.loadMoreBtn.classList.add("hidden")}пш;
//# sourceMappingURL=index.js.map
