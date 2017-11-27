let _baseUrl = '';

/**
 * Sets the current base url used for fetching images.
 * @public
 **/
export function getResourceUrl(url: string): string {
  return _baseUrl + url;
}

/**
 * Gets the current base url used for fetching images.
 * @public
 **/
export function setBaseUrl(baseUrl: string): void {
  _baseUrl = baseUrl;
}
