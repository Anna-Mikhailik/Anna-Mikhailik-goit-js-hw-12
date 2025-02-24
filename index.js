import{a as g,i as m,S as h}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const y="https://pixabay.com/api/",L="48906528-865b601cba228060b80f58b51",b=40;async function u(t,r){const i={key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:b,page:r};try{return(await g.get(y,{params:i})).data}catch(a){return console.error("Error fetching images:",a),{hits:[],totalHits:0}}}function v(t){const{webformatURL:r,largeImageURL:i,tags:a,likes:e,views:s,comments:n,downloads:f}=t;return`
      <li class="gallery-item">
        <a href="${i}" class="gallery-link">
          <img src="${r}" alt="${a}" class="gallery-image" />
        </a>
        <div class="desc">
          <ul class="desc-wraper">
            <li class="desc-item">
              <h3>Likes</h3>
              <p>${e}</p>
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
              <p>${f}</p>
            </li>
          </ul>
        </div>
      </li>
    `}function E(t){return t.map(v).join("")}const o={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let l="",c=1;const d=40;o.form.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.target.elements.text.value.trim(),!l){m.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}o.container.innerHTML="",o.loader.classList.remove("hidden"),o.loadMoreBtn.classList.add("hidden"),c=1;try{const r=await u(l,c,d);p(r),r.length===d&&o.loadMoreBtn.classList.remove("hidden")}catch{m.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{o.loader.classList.add("hidden"),t.target.reset()}});o.loadMoreBtn.addEventListener("click",async()=>{c+=1,o.loader.classList.remove("hidden");try{const t=await u(l,c,d);p(t),t.length<d&&o.loadMoreBtn.classList.add("hidden")}catch{m.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{o.loader.classList.add("hidden")}});function p(t){const r=E(t);o.container.insertAdjacentHTML("beforeend",r),w.refresh()}const w=new h(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
