import{a as f,i as m,S as h}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const y="https://pixabay.com/api/",L="48906528-865b601cba228060b80f58b51",E=40;function u(t){const r={key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E};return f.get(y,{params:r}).then(i=>i.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):i.data.hits).catch(i=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function b(t){const{webformatURL:r,largeImageURL:i,tags:n,likes:e,views:o,comments:s,downloads:p}=t;return`<li class="gallery-item">
                <a href="${i}" class="gallery-link">
                    <img src="${r}" alt="${n}" class="gallery-image" />
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
                            <p>${s}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${p}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function v(t){return t.map(b).join("")}const a={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let l="",c=1;const d=40;a.form.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.target.elements.text.value.trim(),!l){m.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}a.container.innerHTML="",a.loader.classList.remove("hidden"),a.loadMoreBtn.classList.add("hidden"),c=1;try{const r=await u(l,c,d);g(r),r.length===d&&a.loadMoreBtn.classList.remove("hidden")}catch{m.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{a.loader.classList.add("hidden"),t.target.reset()}});a.loadMoreBtn.addEventListener("click",async()=>{c+=1,a.loader.classList.remove("hidden");try{const t=await u(l,c,d);g(t),t.length<d&&a.loadMoreBtn.classList.add("hidden")}catch{m.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{a.loader.classList.add("hidden")}});function g(t){const r=v(t);a.container.insertAdjacentHTML("beforeend",r),w.refresh()}const w=new h(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
