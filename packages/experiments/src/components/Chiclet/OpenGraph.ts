import { IChicletCardProps } from './ChicletCard.types';

export function getOpenGraphProperties(url: string): IChicletCardProps {
  const attributes: IChicletCardProps = {};

  const xmlHttp = new XMLHttpRequest();
  try {
    const openGraphUrl = 'https://opengraph.io/api/1.1/site/';
    xmlHttp.open('GET', openGraphUrl + encodeURIComponent(url) + '?app_id=cddceac9-9fb4-4461-9c8d-5413693e679b', false);
    xmlHttp.overrideMimeType('application/xml');
    xmlHttp.send(null);
  } catch {
    return attributes;
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
