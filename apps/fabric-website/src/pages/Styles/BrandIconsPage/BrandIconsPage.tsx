import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import * as stylesImport from './BrandIconsPage.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../../PageStyles.module.scss');

const svgResolutionData = require('../../../data/brand-icons-svg-resolutions.json');
const pngResolutionData = require('../../../data/brand-icons-png-resolutions.json');
const productIconsData = require('../../../data/brand-icons-products.json');
const documentIconsData = require('../../../data/brand-icons-documents.json');
const monochromeIconsData = require('../../../data/brand-icons-monochrome.json');

export class BrandIconsPage extends React.Component<any, any> {
  public render() {
    let productIcons = productIconsData;
    let documentIcons = documentIconsData;

    return (
      <div className={ pageStyles.basePage }>
        <PageHeader
          pageTitle='Office brand icons'
          links={
            [
              {
                'text': 'Overview',
                'location': 'overview'
              },
              {
                'text': 'Formats and sizes',
                'location': 'formats-and-sizes'
              },
              {
                'text': 'Resolutions',
                'location': 'resolutions'
              },
              {
                'text': 'Implementation',
                'location': 'implementation'
              },
              {
                'text': 'Branded icon library',
                'location': 'branded-icon-library'
              }
            ]
          }
          backgroundColor='#006f94'
        />

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='overview'>Overview</h2>
          <p>Fabric includes product and document icons that you can use to connect your experience with other Office and Office 365 endpoints. The icons come in three formats &mdash; SVG and PNG for multicolor and the icon font for monochrome &mdash; in a variety of sizes and resolutions.</p>
          <p>Usage of these icons is subject to the <a href='https://static2.sharepointonline.com/files/fabric/assets/microsoft_fabric_assets_license_agreement_sept092017.pdf'>assets license agreement (PDF)</a> and our <a href={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/files/office_marketing_guidelines.pdf' }>brand guidelines (PDF)</a>. Please read this document and the resolution/size guidance carefully to ensure that you use our branded icons correctly to create the best experience.</p>
        </div>
        <h3>Product icons</h3>
        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <p className={ styles.paragraphInGrid }>Use product icons to help your users transition between Microsoft products. Product icons represent an app or brand. Do not use a product icon to create a new document of that type. For example, do not create a Word document from a Word product icon.</p>
            </div>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <ul className={ styles.exampleIcons }>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/word_48x1.svg' width='100' height='100' alt='Word logo' />
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_48x1.svg' width='100' height='100' alt='Excel logo' />
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/powerpoint_48x1.svg' width='100' height='100' alt='PowerPoint logo' />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Document icons</h3>
        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <p className={ styles.paragraphInGrid }>Use document icons to indicate to users that they are creating a new document of that type. Make sure that a document of the type that the icon represents loads when the user selects the icon. Document icons should always represent Microsoft Office documents. For example, do not use a Word .docx icon to open a .txt file.</p>
            </div>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <ul className={ styles.exampleIcons }>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg' width='100' height='100' alt='Docx documents SVG' />
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_48x1.svg' width='100' height='100' alt='Xlsx documents logo' />
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/pptx_48x1.svg' width='100' height='100' alt='PPTX documents logo' />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 id='formats-and-sizes'>Formats and sizes</h2>
        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <p className={ styles.paragraphInGrid }>Multicolor product and document icons look best at 16x16, 48x48, and 96x96 px sizes in the UI of Microsoft products. Fabric provides these icons in both SVG and PNG formats. SVGs are more versatile but are not supported by all browsers. PNGs are supported by most browsers, but require many sizes to remain visually crisp.</p>
              <p className={ styles.paragraphInGrid }>PNGs come in 16x16, 32x32, 48x48, and 96x96 pixel sizes. Where possible, use the default sizes to prevent artifacts and split pixels. Otherwise, use a size that is close to one of the default sizes.</p>
              <p className={ styles.paragraphInGrid }>Because SVGs are vectors, you can resize them more easily. They come in two sizes: 16x16 and 48x48 px. Use the size that most closely maps to what you need for your experience for the best quality.</p>
              <p className={ styles.paragraphInGrid }>Monochrome product icons that are included in the icon font are subject to the branding guidelines, but you can reference them just like other icons noted in the <a href='#/styles/icons'>icons section</a>.</p>
            </div>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <ul className={ styles.exampleIcons }>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_16x1.png' width='16' height='16' alt='Outlook 16x1 PNG product icon' />
                  <span>16px (SVG, PNG)</span>
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_32x1.png' width='32' height='32' alt='Outlook 32x1 PNG product icon' />
                  <span>32px (PNG)</span>
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_48x1.png' width='48' height='48' alt='Outlook 48x1 PNG product icon' />
                  <span>48px (SVG, PNG)</span>
                </li>
                <li>
                  <img src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_96x1.png' width='96' height='96' alt='Outlook 96x1 PNG product icon' />
                  <span>96px (PNG)</span>
                </li>
              </ul>
              <ul className={ styles.exampleIcons }>
                <li>
                  <i className='ms-Icon ms-Icon--OutlookLogo ms-fontColor-neutralSecondary' style={ { fontSize: '64px' } } />
                  <span>Icon font</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 id='resolutions'>Resolutions</h2>
        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <p className={ styles.paragraphInGrid }>Fabric provides multicolor icons of each type and size at different resolutions to accommodate pixel densities and scaling factors across mobile, laptop, and desktop screens. Choose the right resolution for your viewport to avoid icons that appear blurry. The resolution guidance doesn&rsquo;t apply to the monochrome font icons.</p>
            </div>
            <div className='ms-Grid-col ms-sm12 ms-lg6'>
              <Table content={ svgResolutionData } />
              <Table content={ pngResolutionData } />
            </div>
          </div>
        </div>

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='implementation'>Implementation</h2>
          <p>To use the Office and Office 365 multicolor brand icons, select the format and size that best meets your needs. The following code shows you how to reference the file. Be sure to use the right resolution for the pixel density of the screen you&rsquo;re targeting.</p>
          <p>Office brand icons come in predefined dimensions at 16px, 48px, and 96px.  Although you may overwrite icon sizes with your custom styles, we recommend using our icons at the predefined sizes so the images appear as intended.  Fabric includes custom media queries that will display our PNG brand icons in a different resolution depending on the device's pixel density.  See the code sample below for an example:</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `// Sample code for displaying an Excel 96x96px Icon
<div class="ms-BrandIcon--icon96 ms-BrandIcon--excel"></div>
`
          }
        </CodeBlock>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `// URLs for the Excel product icon

// Excel product SVGs
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_16x1.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_16x1_5.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_48x1.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_48x1_5.svg

// Excel product PNGs
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_16x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_16x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_16x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_16x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_32x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_32x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_32x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_32x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_48x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_48x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_48x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_48x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_96x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_96x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_96x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/excel_96x3.png

// Excel document SVGs
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_16x1.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_16x1_5.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_48x1.svg
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_48x1_5.svg

// Excel document PNGs
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_16x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_16x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_16x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_16x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_48x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_48x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_48x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_48x3.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_96x1.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_96x1_5.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_96x2.png
https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_96x3.png
`
          }
        </CodeBlock>

        <h2 id='branded-icon-library'>Branded icon library</h2>
        <h3>Product icons</h3>
        <ul className={ styles.iconList }>
          { productIcons.map((icon, iconIndex) => (
            <li key={ iconIndex }>
              <img src={ `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/${icon.name}_48x1.svg` } alt={ icon.name + 'Brand icon' } />
              <span>{ icon.name }</span>
            </li>
          ))
          }
        </ul>

        <h3>Document icons</h3>
        <ul className={ styles.iconList }>
          { documentIcons.map((icon, iconIndex) => (
            <li key={ iconIndex }>
              {/* @todo: Change this back to using SVGs once the CDN has been updated to include the "xsn" icons (issue 252058) */ }
              <img src={ `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${icon.name}_48x1.svg` }
                alt={ icon.name + ' Document Icon' } />
              <span>{ icon.name }</span>
            </li>
          ))
          }
        </ul>

        <h3>Single-color icons</h3>
        <p>Fabric&rsquo;s <a href='#/styles/icons'>icon set</a> also contains single-color product and document icons. You use these single-color icons like all other icons in Fabric. For more information, see the <a href='#/styles/icons'>icons page</a> or the following example:</p>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<i class="ms-Icon ms-Icon--AccessLogo" aria-hidden="true"></i>`
          }
        </CodeBlock>
        <IconGrid icons={ monochromeIconsData } />

      </div>
    );
  }
}
