import * as React from 'react';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { IPageSectionProps, Markdown } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { FabricIconsPageProps } from './FabricIconsPage.doc';
import * as styles from './FabricIconsPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/FabricIconsPage/docs';
const iconData = require('office-ui-fabric-core/src/data/icons.json');

export const FabricIconsPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...FabricIconsPageProps[platform]} otherSections={_otherSections(platform)} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Usage',
          editUrl: `${baseUrl}/web/FabricIconsUsage.md`,
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsUsage.md') as string}
            </Markdown>
          )
        },

        {
          sectionName: 'Icons',
          content: (
            <div className={styles.iconGrid}>
              <IconGrid icons={iconData} />
            </div>
          )
        }
      ];

    default:
      return [
        {
          sectionName: 'Coming Soon',
          content: 'Coming Soon'
        }
      ];
  }
}
