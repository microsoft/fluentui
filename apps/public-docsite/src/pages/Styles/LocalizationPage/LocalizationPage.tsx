import * as React from 'react';
import { Markdown, MarkdownHeader, IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { Table, ITableContent } from '../../../components/Table/Table';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { LocalizationPageProps } from './LocalizationPage.doc';
import * as styles from './LocalizationPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/LocalizationPage/docs';

const directionalIconsData = require<[string, string][]>('../../../data/directional-icons.json');
const localizedFontsData = require<ITableContent>('../../../data/localized-fonts.json');

export const LocalizationPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...LocalizationPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Right-to-left layouts',
          editUrl: `${baseUrl}/web/LocalizationRTL.md`,
          content: (
            <Markdown>
              {require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/LocalizationPage/docs/web/LocalizationRTL.md')}
            </Markdown>
          ),
        },
        {
          sectionName: 'Directional icons',
          content: (
            <>
              <p>
                With the reading direction set to RTL, Fabric Core uses mixins to add RTL-specific rules which will
                automatically substitute directional icons. The following pairs of icons will be swapped when viewed on
                RTL pages:
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
          ),
        },
        {
          sectionName: 'Language-optimized fonts',
          editUrl: `${baseUrl}/web/LocalizationFonts.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/LocalizationPage/docs/web/LocalizationFonts.md')}
              </Markdown>
              <MarkdownHeader as="h3">Supported languages</MarkdownHeader>
              <p>Fluent UI supports a variety of language codes, which map to the following font stacks:</p>
              <Table content={localizedFontsData} />
            </>
          ),
        },
      ];
  }
}
