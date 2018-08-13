import { IChicletCardProps } from './ChicletCard.types';

export function getOpenGraphProperties(url: string): IChicletCardProps {
  const attributes: IChicletCardProps = {};
  const metaElements = extractMetaTags(url);

  for (let i = 0; i < metaElements.length; i++) {
    if (metaElements[i].attributes !== null && metaElements[i].attributes.length >= 2) {
      switch (metaElements[i].attributes[0].nodeValue) {
        case 'og:title':
          attributes.title = metaElements[i].content;
          break;
        case 'og:type':
          attributes.itemType = metaElements[i].content;
          break;
        case 'og:image':
        case 'og:image:url':
          attributes.image = metaElements[i].content;
          break;
        case 'og:image:secure_url':
          attributes.imageSecureUrl = metaElements[i].content;
          break;
        case 'og:image:type':
          attributes.imageType = metaElements[i].content;
          break;
        case 'og:image:width':
          attributes.imageWidth = metaElements[i].content;
          break;
        case 'og:image:height':
          attributes.imageHeight = metaElements[i].content;
          break;
        case 'og:image:alt':
          attributes.imageAlt = metaElements[i].content;
          break;
        case 'og:url':
          attributes.url = metaElements[i].content;
          break;
      }
    }
  }
  return attributes;
}

function extractMetaTags(url: string): NodeListOf<HTMLMetaElement> {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.overrideMimeType('application/xml');
  xmlHttp.send(null);

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlHttp.responseText, 'text/html');

  const metaElements = doc.getElementsByTagName('meta');
  return metaElements;
}
