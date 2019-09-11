import * as React from 'react';
import { Markdown, MarkdownHeader, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { Table } from '../../../components/Table/Table';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { LocalizationPageProps } from './LocalizationPage.doc';
import * as styles from './LocalizationPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/LocalizationPage/docs';

const directionalIconsData = require('../../../data/directional-icons.json');
const localizedFontsData = require('../../../data/localized-fonts.json');

export const LocalizationPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...LocalizationPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Right-to-left layouts',
          editUrl: `${baseUrl}/web/LocalizationRTL.md`,
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/LocalizationPage/docs/web/LocalizationRTL.md')}
            </Markdown>
          )
        },
        {
          sectionName: 'Directional Icons',
          content: (
            <>
              <p>
                With the reading direction set to RTL and Fabric's RTL stylesheet referenced (see above), directional icons will
                automatically be substituted. These pairs of icons will be swapped when viewed on RTL pages:
              </p>
              <ul className={styles.directionalIcons}>
                {directionalIconsData.map((pair, pairIndex) => (
                  <li className={styles.directionalIconPair} key={pairIndex}>
                    <div className={styles.directionalIcon}>
                      <i className={'ms-Icon ms-Icon--' + pair[0]} />
                      <span>{pair[0]}</span>
                    </div>
                    <div className={styles.directionalIcon}>
                      <i className={'ms-Icon ms-Icon--' + pair[1]} />
                      <span>{pair[1]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )
        },
        {
          sectionName: 'Language-optimized fonts',
          editUrl: `${baseUrl}/web/LocalizationFonts.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/LocalizationPage/docs/web/LocalizationRTL.md')}
              </Markdown>
              <MarkdownHeader as="h3">Supported languages</MarkdownHeader>
              <p>Fabric supports a variety of language codes, which map to the following font stacks:</p>
              <Table content={localizedFontsData} />
            </>
          )
        }
      ];
  }
}
