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
    const { /*type, className, title, description, image, imageUrl, imageSecureUrl,
      imageWidth, imageHeight, imageType, url,*/ children, url } = this.props;

    const html: string = `<html>
        <!-- This is my comment! -->
        <head>
          <meta charset=\"utf-8\" >
          <link rel=\"ferde\" href=\"https://wsjeiocfn.com">
          <meta property=\"og:title\" content=\"The Rock\" >
          <meta property=\"og:type\" content=\"video.movie\" >
          <meta property=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
          <meta name=\"og:title\" content=\"The Rock\" >
          <meta name=\"og:type\" content=\"video.movie\" >
          <meta name=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
        </head>
        <body>
        </body>
      </html>`;

    let openGraphObject = this.extractMetaTags(html);

    return (
      <div className={ css(styles.root) }>
        <ChicletCard
          title={ openGraphObject.title }
          description={ openGraphObject.description }
          url={ openGraphObject.url }
          image={ openGraphObject.image }
          imageType={ openGraphObject.imageType }
        />
        { children }
      </div>
    );
  }

  public extractMetaTags(html: string) {
    var attributes: IChicletCardProps = {};

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:4322", false);
    xmlHttp.overrideMimeType('text/xml');
    xmlHttp.send(null);
    // var xmlDocument = xmlHttp.responseXML;
    // var responseString = xmlHttp.responseText;

    var metaElements = document.getElementsByTagName("meta");
    for (var i = 0; i < metaElements.length; i++) {
      console.log("Content of meta tag: " + metaElements[i].content);
    }

    let openGraphObject = this._getChildren(metaElements, attributes);

    return openGraphObject;
  }

  public _getChildren(metaElements: NodeListOf<HTMLMetaElement>, attributes: IChicletCardProps): IChicletCardProps {
    for (var i = 0; i < metaElements.length; i++) {
      switch (metaElements[i].name) {
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
        case "og:description":
          attributes.description = metaElements[i].content;
          break;
        case "og:url":
          attributes.url = metaElements[i].content;
          break;
      }
    }
    return attributes;
  }

}
