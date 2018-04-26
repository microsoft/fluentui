import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { Chiclet } from './Chiclet';
import { IBaseChicletProps } from './BaseChiclet.types';
import { IChicletCardProps } from './ChicletCard.types';

export class BaseChiclet extends BaseComponent<IBaseChicletProps, any> {
  public render() {
    const { url, size, actions } = this.props;

    let chicletCardProps = this.extractMetaTags(url);

    return (
      <Chiclet chicletCardProps={ chicletCardProps } size={ size ? size : 2 } actions={ actions } />
    );
  }

  public extractMetaTags(url: string) {
    var attributes: IChicletCardProps = {};

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.overrideMimeType('text/xml');
    xmlHttp.send(null);

    var metaElements = document.getElementsByTagName("meta");
    let openGraphObject = this._getOpenGraphValues(metaElements, attributes);

    return openGraphObject;
  }

  public _getOpenGraphValues(metaElements: NodeListOf<HTMLMetaElement>, attributes: IChicletCardProps): IChicletCardProps {
    for (var i = 0; i < metaElements.length; i++) {
      if (metaElements[i].attributes != null && metaElements[i].attributes.length >= 2) {
        switch (metaElements[i].attributes[0].nodeValue) {
          case "og:title":
            attributes.title = metaElements[i].content;
            break;
          case "og:type":
            attributes.ogType = metaElements[i].content;
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
          case "og:description":
            attributes.description = metaElements[i].content;
            break;
          case "og:url":
            attributes.url = metaElements[i].content;
            break;
        }
      }
    }
    return attributes;
  }
}
