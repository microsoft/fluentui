/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file ImageGenerator.tsx
 */
/* tslint:disable */
import * as React from 'react';
import HtmlGenerator, { IHtmlGeneratorProps } from './HtmlGenerator';
import { IValidateResult } from '../HtmlValidator/HtmlValidator';
import { IHTMLEmbedArea } from '../HTMLEmbed.Props';
/* tslint:enable */

export class BingPreviewStyleGenerator extends HtmlGenerator {

  // @todo. use OWA style first, when our bing preview style design coming out, will change it.
  // so don't review this method.
  /* tslint:disable */
  public createHtmlElement(): JSX.Element {
    return (
      <div
        style= { {marginBottom: '20px', overflow: 'auto',  width: '100%', textIndent: '0px'} }
      >
        <table
          cellspacing={'0'}
          style={ {width: '90%', position: 'relative', overflow: 'auto', paddingTop: '20px', paddingBottom: '20px',
            marginTop: '20px', borderTop: '1px dotted rgb(200, 200, 200)', borderBottom: '1px dotted rgb(200, 200, 200)',
            backgroundColor: 'rgb(255, 255, 255)'} }
        >
          <tbody>
            <tr
              valign={'top'}
              style={ {borderSpacing: '0px'} }
            >
                <td
                  colspan='1'
                  style={ {width: '250px', position: 'relative', display: 'table-cell', paddingRight: '20px'} }
                >
                  <div
                    style={ {height: '187px', position: 'relative', margin: 'auto',
                      width: '250px', backgroundColor: 'rgb(255, 255, 255)'} }
                  >
                    <a
                      href={ this._htmlGeneratorProps.originalUrl }
                      target='_blank' style={ {display: 'table-cell', textAlign: 'center'} }>
                      <img
                        src={ this._htmlGeneratorProps.metadata.Thumbnail } width='250' height='187'
                        style={ {display: 'inline-block', maxWidth: '250px', maxHeight: '250px', height: '187px', width: '250px',
                          borderWidth: '0px', verticalAlign: 'bottom'} }
                      />
                      <div
                        style={ {top: '50%', marginTop: '-20px', position: 'absolute', left: '0px', right: '0px', marginLeft: 'auto', marginRight: 'auto' } }
                      >
                        <span style={ {color: 'rgb(255, 255, 255)'} }/>
                      </div>
                    </a>
                    <button style={ {position: 'absolute', right: '0px', bottom: '0px', width: '30px', height: '30px', border: '0px', cursor: 'pointer',
                      color: 'rgb(234, 234, 234)', display: 'none', backgroundColor: 'rgba(0, 0, 0, 0.560784)'} }
                      className='ms-Icon--volumeOff ms-icon-font-size-16'
                    />
                  </div>
                </td>
                <td colspan='2' style={ {verticalAlign: 'top', position: 'relative', padding: '0px', display: 'table-cell'} }>
                  <div>
                    <a className='ms-Icon--x ms-icon-font-size-14' style={ {
                      fontFamily: 'wf_segoe-ui_normal, &quot;Segoe UI&quot;, &quot;Segoe WP&quot;, Tahoma,Arial, sans-serif', fontWeight: 'normal',
                      position: 'relative', cursor: 'pointer', padding: '8px', float: 'right', color: 'rgb(102, 102, 102)', WebkitUserSelect: 'none',
                      marginLeft: '10px', backgroundColor: 'rgb(244, 249, 253)'} }>
                    </a>
                  </div>
                  <div style={ {top: '0px', color: 'rgb(0, 120, 215)', fontWeight: 'normal', fontSize: '21px',
                    fontFamily: '&quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, sans-serif; line-height: 21px'} }>
                    <a href={ this._htmlGeneratorProps.originalUrl } target='_blank' style={ {textDecoration: 'none'} }>
                      { this._htmlGeneratorProps.metadata.Title }
                    </a>
                  </div>
                  <div style={ {margin: '10px 0px 16px', color: 'rgb(102, 102, 102)', fontWeight: 'normal',
                    fontFamily: '&quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, sans-serif',
                    fontSize: '14px', lineHeight: '14px'} }>
                    { this._getHostName() }
                  </div>
                  <div style={ {display: 'block', color: 'rgb(102, 102, 102)', fontWeight: 'normal',
                    fontFamily: '&quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, sans-serif',
                    fontSize: '14px', lineHeight: '20px', maxHeight: '100px', overflow: 'hidden'} }>
                      { this._htmlGeneratorProps.metadata.Description }
                    </div>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
  /* tslint:enable */

  public getFilteredVanillaHtml(): string {
    return '';
  }

  public isValidImp(vanillaHtml: string): Promise<IValidateResult> {
    return Promise.resolve({ isValid: true, errorMessage: '' });
  }

  protected getWidth(): number {
    return this._htmlGeneratorProps.htmlEmbedArea.width;
  }

  protected getHeight(): number {
    return this._htmlGeneratorProps.htmlEmbedArea.height;
  }

  private _getHostName(): string {
    let hostname: string = '';
    if (this._htmlGeneratorProps.originalUrl) {
      const regExpResult: string[] = /^\s*(http:\/\/|\/\/|https:\/\/)[^\/]+/i.exec(
        this._htmlGeneratorProps.originalUrl);
      if (regExpResult && regExpResult.length) {
        hostname = regExpResult[0].replace(/^\s*(http:\/\/|\/\/|https:\/\/)/i, '');
      }
    }

    return hostname;
  }
}

export default BingPreviewStyleGenerator;
