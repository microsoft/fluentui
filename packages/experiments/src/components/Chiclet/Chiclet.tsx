import * as React from 'react';
import * as Cheerio from 'cheerio';
import * as HtmlParser from 'htmlparser2';
import {
  BaseComponent
} from '../../Utilities';
import { IChicletProps, IChicletCardProps } from './Chiclet.types';
//import * as stylesImport from './Chiclet.scss';

//var fieldMap: { [property: string]: string; } = {};

export class Chiclet extends BaseComponent<IChicletProps, any> {
  public render() {
    const { /*type, className, title, description, image, imageUrl, imageSecureUrl,
      imageWidth, imageHeight, imageType, url,*/ children, url } = this.props;

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

    // const html: string = `
    //   <!-- This is my comment! -->
    //   <head>
    //     <meta charset=\"utf-8\" />
    //     <link rel=\"ferde\" href=\"https://wsjeiocfn.com">
    //     <meta property=\"og:title\" content=\"The Rock\" >
    //     <meta property=\"og:type\" content=\"video.movie\" >
    //     <meta property=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
    //     <meta name=\"og:title\" content=\"The Rock\" >
    //     <meta name=\"og:type\" content=\"video.movie\" >
    //     <meta name=\"og:url\" content=\"http://www.imdb.com/title/tt0117500/\" >
    //   </head>
    //   <body>
    //     <html>

    //     </html>
    //   </body>`;

    let openGraphObject = this.extractMetaTags(url, fieldMap);

    return (
      <div>
        <div>
          {/* { openGraphObject.title ? (<div>{ "Title: " + openGraphObject.title }</div>) : (null) }
          { openGraphObject.url ? (<div>{ "Url: " + openGraphObject.url }</div>) : (null) }
          { openGraphObject.image ? (<div>{ "Image: " + openGraphObject.image }</div>) : (null) }
          { openGraphObject.description ? (<div>{ "Description: " + openGraphObject.description }</div>) : (null) }
          { openGraphObject.type ? (<div>{ "Type: " + openGraphObject.type }</div>) : (null) } */}
        </div>
        { children }
      </div>
    );
  }

  public extractMetaTags(html: string, fieldMap: { [property: string]: string }) {
    var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
    var str = "<head><meta property=\"og:title\" content=\"La La Land\"><meta property=\"og:title\" content=\"La La Land\"><meta property=\"og:title\" content=\"La La Land\"></head>";
    if (str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3) {
      //isHtml
    }
    var match = quickExpr.exec(str);
    if (!!(match && match[1])) {
      //isHtml
    }
    // var i = 0;
    // var metaTags: { [property: string]: string } = {};
    // while(i < html.length) {
    //   var c = html.charAt(i);
    //   if (c === "<"){
    //     if()
    //   }
    // }

    const $ = Cheerio.load(html);
    const meta = $('meta');
    let openGraphObject: IChicletCardProps = {}; //{ [property: string]: string } = {};

    for (let key in meta) {
      if (!(meta[key].attribs && (meta[key].attribs.property || meta[key].attribs.name))) {
        break;
      }

      const property = meta[key].attribs.property || meta[key].attribs.name;
      const content = meta[key].attribs.content || meta[key].attribs.value;

      if (property in fieldMap) {
        let name: string = fieldMap[property];
        // openGraphObject["title"] = content;
      }
    }

    return openGraphObject;
  }

}
