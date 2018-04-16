import * as React from 'react';
import * as Cheerio from 'cheerio';
import { IChicletProps, ChicletType } from './Chiclet.types';
import { ChicletTitle } from './ChicletTitle';
import {
  BaseComponent,
  KeyCodes,
  css,
  styled
} from '../../Utilities';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

var fieldMap: { [property: string]: string; } = {};

export class Chiclet extends BaseComponent<IChicletProps, any> {
  constructor(props: IChicletProps) {
    super(props);
  }

  public render() {
    const { type, className, title, description, image, imageUrl, imageSecureUrl,
      imageWidth, imageHeight, imageType, url, children } = this.props;

    var fieldMap: { [property: string]: string } =
      {
        "og:title": "title",
        "og:type": "type",
        "og:image": "image",
        "og:image:url": "image", // og:image and og:image:url are identical
        "og:image:secure_url": "imageSecureUrl",
        "og:image:width": "imageWidth",
        "og:image:height": "imageHeight",
        "og:description": "description",
        "og:url": "url"
      };

    const html: string = `
      <!-- This is my comment! -->
      <head>
        <meta charset=\"utf-8\" />
        <link rel=\"ferde\" href=\"https://wsjeiocfn.com">
        <meta property=\"og:title\" content=\"The Rock\" >
        <meta property=\"og:type\" content=\"video.movie\" >
        <meta property=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
        <meta name=\"og:title\" content=\"The Rock\" >
        <meta name=\"og:type\" content=\"video.movie\" >
        <meta name=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
      </head>
      <body>
        <html>

        </html>
      </body>`;

    let openGraphObject = this.extractMetaTags(html, fieldMap);

    return (
      <div>
        <div>
          { openGraphObject.title ? (<div>{ "Title: " + openGraphObject.title }</div>) : (null) }
          { openGraphObject.url ? (<div>{ "Url: " + openGraphObject.url }</div>) : (null) }
          { openGraphObject.image ? (<div>{ "Image: " + openGraphObject.image }</div>) : (null) }
          { openGraphObject.description ? (<div>{ "Description: " + openGraphObject.description }</div>) : (null) }
          { openGraphObject.type ? (<div>{ "Type: " + openGraphObject.type }</div>) : (null) }
        </div>
        { children }
      </div>
    );
  }

  public extractMetaTags(html: string, fieldMap: { [property: string]: string }) {
    const $ = Cheerio.load(html);
    const meta = $('meta');
    let openGraphObject: IChicletProps = {}; //{ [property: string]: string } = {};

    for (let key in meta) {
      if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
        break;
      }

      const property = meta[key].attribs.property || meta[key].attribs.name;
      const content = meta[key].attribs.content || meta[key].attribs.value;

      if (property in fieldMap) {
        let name: string = fieldMap[property];
        openGraphObject[name] = content;
      }
    }

    return openGraphObject;
  }

}
