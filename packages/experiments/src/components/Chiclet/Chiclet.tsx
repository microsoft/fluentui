import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { IChicletProps, IChicletCardProps } from './Chiclet.types';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

//var fieldMap: { [property: string]: string; } = {};

export class Chiclet extends BaseComponent<IChicletProps, any> {
  public render() {
    const { url } = this.props;

    let chicletCardProps = this.extractMetaTags(url);

    return (
      <div
        className={ css(styles.root) }
      >
        <ChicletCard
          { ...chicletCardProps }
          onClick={ this._onClick }
        />
      </div>
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
          case "og:image:type":
            attributes.imageType = metaElements[i].content;
            break;
          case "og:image:width":
            attributes.imageWidth = metaElements[i].content;
            break;
          case "og:image:height":
            attributes.imageHeight = metaElements[i].content;
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

  private _onClick(): void {
    console.log("You clicked the Chiclet");
  }

}
