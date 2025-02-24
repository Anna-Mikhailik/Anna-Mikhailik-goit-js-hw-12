import{a as g,i as a,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const L="https://pixabay.com/api/",b="48906528-865b601cba228060b80f58b51",v=40;async function u(e,r){const n={key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:r};try{return(await g.get(L,{params:n})).data}catch(i){return console.error("Error fetching images:",i),{hits:[],totalHits:0}}}function E(e){const{webformatURL:r,largeImageURL:n,tags:i,likes:t,views:s,comments:l,downloads:p}=e;return`
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
              <p>${s}</p>
            </li>
            <li class="desc-item">
              <h3>Comments</h3>
              <p>${l}</p>
            </li>
            <li class="desc-item">
              <h3>Downloads</h3>
              <p>${p}</p>
            </li>
          </ul>
        </div>
      </li>
    `}function w(e){return e.map(E).join("")}const o={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let c="",d=1;const R=40;let m=0;o.form.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.text.value.trim(),!c){a.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}o.container.innerHTML="",o.loader.classList.remove("hidden"),o.loadMoreBtn.classList.add("hidden"),d=1;try{const r=await u(c,d);m=r.totalHits,r.hits.length===0?a.info({title:"No Results",message:"Sorry, no images found for your search.",position:"topRight"}):(f(r.hits),h())}catch{a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{o.loader.classList.add("hidden"),e.target.reset()}});o.loadMoreBtn.addEventListener("click",async()=>{d+=1,o.loader.classList.remove("hidden");try{const e=await u(c,d);e.hits.length===0?(a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),o.loadMoreBtn.classList.add("hidden")):(f(e.hits),h())}catch{a.error({title:"Error",message:"Error loading more images!",position:"topRight"})}finally{o.loader.classList.add("hidden")}});function f(e){const r=w(e);o.container.insertAdjacentHTML("beforeend",r),S.refresh()}const S=new y(".gallery a",{captionsData:"alt",captionDelay:250});function h(){const e=o.container.querySelectorAll(".gallery-item").length;e>=m?(o.loadMoreBtn.classList.add("hidden"),a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):e<m&&e%R===0&&o.loadMoreBtn.classList.remove("hidden")}
//# sourceMappingURL=index.js.map
