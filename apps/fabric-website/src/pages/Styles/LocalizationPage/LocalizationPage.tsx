import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
const pageStyles: any = require('../../PageStyles.module.scss');
import * as stylesImport from './LocalizationPage.module.scss';
const styles: any = stylesImport;

const directionalIconsData = require('../../../data/directional-icons.json');
const localizedFontsData = require('../../../data/localized-fonts.json');

export class LocalizationPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Localization'
          links={
            [
              {
                'text': 'Layout',
                'location': 'layout'
              },
              {
                'text': 'Fonts',
                'location': 'fonts'
              }
            ]
          }
          backgroundColor='#006f94'
        />
        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='layout'>Right-to-left layouts</h2>
          <p>Fabric comes with an alternate CSS file for pages written in right-to-left (RTL) languages, such as Arabic and Hebrew. This reverses the order of columns in the responsive grid, making it easy to create an RTL layout without writing additional templates. Many icons are also reversed, particularly those used for navigation such as arrows.</p>

          <h3>Implementation</h3>
          <p>Apply the &ldquo;dir&rdquo; attribute to the HTML tag, and reference the RTL version of Fabric.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<html dir="rtl">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="fabric-[version].rtl.min.css">
</head>
...
</html>`
          }
        </CodeBlock>

        <h3>Directional icons</h3>
        <p>With the reading direction set to RTL and Fabric's RTL stylesheet referenced (see above), directional icons will automatically be substituted. These pairs of icons will be swapped when viewed on RTL pages:</p>

        <ul className={ styles.directionalIcons }>
          { directionalIconsData.map((pair, pairIndex) => (
            <li className={ styles.directionalIconPair } key={ pairIndex }>
              <div className={ styles.directionalIcon }>
                <i className={ 'ms-Icon ms-Icon--' + pair[0] } />
                { pair[0] }
              </div>
              <div className={ styles.directionalIcon }>
                <i className={ 'ms-Icon ms-Icon--' + pair[1] } />
                { pair[1] }
              </div>
            </li>
          )) }
        </ul>

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='fonts'>Language-optimized fonts</h2>
          <p>By default, Fabric presents all text using the Western European character set of Segoe UI. For languages with other characters, Fabric will either serve a version of Segoe UI with a different character set or use a system font.</p>

          <h3>Implementation</h3>
          <p>The HTML &ldquo;lang&rdquo; attribute specifies the language of the element's content. This is typically applied to the root HTML element, where it will be inherited by the entire page. In this example the entire page is in Thai.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<html lang="th-TH">...</html>`
          }
        </CodeBlock>

        <div className={ pageStyles.u_maxTextWidth }>
          <p>For pages with content in multiple languages, the &ldquo;lang&rdquo; attribute can be applied to individual elements. In this example, a page that is mostly Thai also contains some Vietnamese.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<html lang="th-TH">
...
<section lang="vi-VN">...</section>
</html>`
          }
        </CodeBlock>

        <h3>Supported languages</h3>
        <p>Fabric supports a variety of language codes, which map to the following font stacks:</p>
        <Table content={ localizedFontsData } responsive={ true } />
      </div>
    );
  }
}
