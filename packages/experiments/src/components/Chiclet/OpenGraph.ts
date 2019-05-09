import { IChicletCardProps } from './ChicletCard.types';

export function getOpenGraphProperties(url: string): IChicletCardProps {
  const attributes: IChicletCardProps = {};

  const xmlHttp = new XMLHttpRequest();
  if (url.indexOf('localhost') !== -1) {
    return handleLocalHost(url);
  }
  if (url !== '') {
    const openGraphUrl = 'https://opengraph.io/api/1.1/site/';
    xmlHttp.open('GET', openGraphUrl + encodeURIComponent(url) + '?app_id=cddceac9-9fb4-4461-9c8d-5413693e679b', false);
    xmlHttp.overrideMimeType('application/xml');
    xmlHttp.send(null);
  }

  if (xmlHttp.status === 200 && xmlHttp.response) {
    const responseJson = JSON.parse(xmlHttp.response);
    // hybridGraph contains as much of the Open Graph data that can be referred from the site requested
    // if the Open Graph tags exist on the site, hybridGraph will mirror them
    const hybridGraph = responseJson.hybridGraph;
    if (hybridGraph) {
      attributes.title = hybridGraph.title;
      attributes.url = hybridGraph.url;
      attributes.itemType = hybridGraph.type;
      if (hybridGraph.image) {
        if (typeof hybridGraph.image === 'string') {
          attributes.image = hybridGraph.image;
        } else {
          attributes.image = hybridGraph.image.url;
          attributes.imageType = hybridGraph.image.type;
          attributes.imageWidth = hybridGraph.image.width;
          attributes.imageAlt = hybridGraph.image.alt;
        }
      }
    }
  }

  return attributes;
}

export function handleLocalHost(url: string): IChicletCardProps {
  const attributes: IChicletCardProps = {};
  const xmlHttp = new XMLHttpRequest();

  try {
    xmlHttp.open('GET', url, false);
    xmlHttp.overrideMimeType('application/xml');
    xmlHttp.send(null);
  } catch (error) {
    return attributes;
  }

  if (xmlHttp.status === 200 && xmlHttp.response) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlHttp.responseText, 'text/html');

    const metaElements = doc.getElementsByTagName('meta');

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
  }

  return attributes;
}
