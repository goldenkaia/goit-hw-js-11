export const createMarkup = (items = []) => {
  return items
    .map(
      ({
        downloads,
        likes,
        views,
        comments,
        tags,
        webformatURL,
        largeImageURL,
      }) => {
        return `<a href='${largeImageURL}'><div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <div class="info-item">
        <b>Likes</b>
        <p>${likes}</p>
      </div>
      <div class="info-item">
        <b>Views</b>
        <p>${views}</p>
      </div>
      <div class="info-item">
      <b>Comments</b>
        <p>${comments}</p>
      </div>
      <div class="info-item">
        <b>Downloads</b>
        <p>${downloads}</p>
      </div>
    </div>
  </div></a>`;
      }
    )
    .join('');
};
