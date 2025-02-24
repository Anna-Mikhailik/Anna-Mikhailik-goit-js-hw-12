import{a as g,i as d,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const L="https://pixabay.com/api/",b="48906528-865b601cba228060b80f58b51",v=40;async function h(e,r){const a={key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:r};try{return(await g.get(L,{params:a})).data}catch(i){return console.error("Error fetching images:",i),{hits:[],totalHits:0}}}function w(e){const{webformatURL:r,largeImageURL:a,tags:i,likes:t,views:o,comments:n,downloads:f}=e;return`
      <li class="gallery-item">
        <a href="${a}" class="gallery-link">
          <img src="${r}" alt="${i}" class="gallery-image" />
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
              <p>${n}</p>
            </li>
            <li class="desc-item">
              <h3>Downloads</h3>
              <p>${f}</p>
            </li>
          </ul>
        </div>
      </li>
    `}function E(e){return e.map(w).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",l=1;const m=40;let u=0;s.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){d.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s.container.innerHTML="",s.loader.classList.remove("hidden"),s.loadMoreBtn.classList.add("hidden"),l=1;try{const r=await h(c,l);u=r.totalHits,p(r.hits),r.hits.length===m&&u>m&&s.loadMoreBtn.classList.remove("hidden")}catch{d.error({title:"Error",message:"No images found. Try again!",position:"topRight"})}finally{s.loader.classList.add("hidden"),e.target.reset()}});s.loadMoreBtn.addEventListener("click",async()=>{l+=1,s.loader.classList.remove("hidden");try{const e=await h(c,l);p(e.hits),(e.hits.length<m||u<=l*m)&&(s.loadMoreBtn.classList.add("hidden"),d.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),S()}catch{d.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{s.loader.classList.add("hidden")}});function p(e){const r=E(e);s.container.insertAdjacentHTML("beforeend",r),R.refresh()}const R=new y(".gallery a",{captionsData:"alt",captionDelay:250});function S(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
