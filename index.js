import{a as m,i as l,S as u}from"./assets/vendor-CUAzmrUA.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d="https://pixabay.com/api/",g="48906528-865b601cba228060b80f58b51",p=40;function f(r){const i={key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p};return m.get(d,{params:i}).then(o=>o.data.hits.length===0?(iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):o.data.hits).catch(o=>(iziToast.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"}),[]))}function h(r){const{webformatURL:i,largeImageURL:o,tags:n,likes:e,views:t,comments:a,downloads:c}=r;return`<li class="gallery-item">
                <a href="${o}" class="gallery-link">
                    <img src="${i}" alt="${n}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${e}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${t}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${a}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${c}</p>
                        </li>
                    </ul>
                </div>
            </li>`}function y(r){return r.map(h).join("")}const s={container:document.querySelector(".gallery"),form:document.querySelector(".form"),loader:document.querySelector(".loader")};s.form.addEventListener("submit",r=>{r.preventDefault();const i=r.target.elements.text.value.trim();if(!i){l.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"});return}s.container.innerHTML="",s.loader.classList.remove("hidden"),f(i).then(o=>{L(o)}).catch(o=>{l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}).finally(()=>{s.loader.classList.add("hidden"),r.target.reset()})});function L(r){const i=y(r);s.container.insertAdjacentHTML("beforeend",i),b.refresh()}const b=new u(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
