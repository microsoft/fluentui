import { IChicletCardProps } from './ChicletCard.types';

export function getOpenGraphProperties(url: string) {
  var attributes: IChicletCardProps = {};
  var metaElements = extractMetaTags(url);

  for (var i = 0; i < metaElements.length; i++) {
    if (metaElements[i].attributes != null && metaElements[i].attributes.length >= 2) {
      switch (metaElements[i].attributes[0].nodeValue) {
        case "og:title":
          attributes.title = metaElements[i].content;
          break;
        case "og:type":
          attributes.itemType = metaElements[i].content;
          break;
        case "og:image":
        case "og:image:url":
          attributes.image = metaElements[i].content;
          break;
        case "og:image:secure_url":
          attributes.imageSecureUrl = metaElements[i].content;
          break;
        case "og:image:type":
          attributes.imageType = metaElements[i].content;
          break;
        case "og:image:width":
          attributes.imageWidth = metaElements[i].content;
          break;
        case "og:image:height":
          attributes.imageHeight = metaElements[i].content;
          break;
        case "og:image:alt":
          attributes.imageAlt = metaElements[i].content;
          break;
        case "og:url":
          attributes.url = metaElements[i].content;
          break;
      }
    }
  }
  return attributes;
}

function extractMetaTags(url: string) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.overrideMimeType('application/xml');
  xmlHttp.send(null);

  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlHttp.responseText, "text/html");

  var metaElements = doc.getElementsByTagName("meta");
  return metaElements;
}
