let _baseUrl = '';

/**
 * @deprecated Unused as of version 8
 */
export function getResourceUrl(url: string): string {
  return _baseUrl + url;
}

/**
 * @deprecated Unused as of version 8
 */
export function setBaseUrl(baseUrl: string): void {
  _baseUrl = baseUrl;
}
