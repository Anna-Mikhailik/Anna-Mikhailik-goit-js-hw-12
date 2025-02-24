import{a as p,i as a,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const L="https://pixabay.com/api/",v="48906528-865b601cba228060b80f58b51",w=40;async function u(e,r){const n={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w,page:r};try{return(await p.get(L,{params:n})).data}catch(i){return console.error("Error fetching images:",i),{hits:[],totalHits:0}}}function b(e){const{webformatURL:r,largeImageURL:n,tags:i,likes:t,views:o,comments:l,downloads:f}=e;return`
      <li class="gallery-item">
        <a href="${n}" class="gallery-link">
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
              <p>${l}</p>
            </li>
            <li class="desc-item">
              <h3>Downloads</h3>
              <p>${f}</p>
            </li>
          </ul>
        </div>
      </li>
    `}function E(e){return e.map(b).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let d="",c=1;const m=40;let h=0;s.form.addEventListener("submit",async e=>{if(e.preventDefault(),d=e.target.elements.text.value.trim(),!d){a.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s.container.innerHTML="",s.loader.classList.remove("hidden"),s.loadMoreBtn.classList.add("hidden"),c=1;try{const r=await u(d,c);h=r.totalHits,r.hits.length===0?a.info({title:"No Results",message:"Sorry, no images found for your search.",position:"topRight"}):(g(r.hits),r.hits.length===m&&h>m&&s.loadMoreBtn.classList.remove("hidden"))}catch{a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{s.loader.classList.add("hidden"),e.target.reset()}});s.loadMoreBtn.addEventListener("click",async()=>{c+=1,s.loader.classList.remove("hidden");try{const e=await u(d,c);e.hits.length===0?(a.info({title:"End of Results",message:"You've reached the end of search results.",position:"topRight"}),s.loadMoreBtn.classList.add("hidden")):(g(e.hits),(e.hits.length<m||h<=c*m)&&(s.loadMoreBtn.classList.add("hidden"),a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),S())}catch{a.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{s.loader.classList.add("hidden")}});function g(e){const r=E(e);s.container.insertAdjacentHTML("beforeend",r),R.refresh()}const R=new y(".gallery a",{captionsData:"alt",captionDelay:250});function S(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
