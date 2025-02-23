export function imageTemplate(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;

  return `<li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
                </a>
                <div class="desc">
                    <ul class="desc-wraper">
                        <li class="desc-item">
                            <h3>Likes</h3>
                            <p>${likes}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Views</h3>
                            <p>${views}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Comments</h3>
                            <p>${comments}</p>
                        </li>
                        <li class="desc-item">
                            <h3>Downloads</h3>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </div>
            </li>`;
}

export function imagesTemplate(items) {
  return items.map(imageTemplate).join('');
}
