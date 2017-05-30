let _baseUrl = '';

/** Sets the current base url used for fetching images. */
export function getResourceUrl(url) {
  return _baseUrl + url;
}

/** Gets the current base url used for fetching images. */
export function setBaseUrl(baseUrl) {
  _baseUrl = baseUrl;
}
