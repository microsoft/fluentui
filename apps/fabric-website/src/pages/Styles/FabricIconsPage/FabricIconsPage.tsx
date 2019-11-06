import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { FabricIconsPageProps } from './FabricIconsPage.doc';
import * as styles from './FabricIconsPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/FabricIconsPage/docs';
const fabricCoreIcons = require('office-ui-fabric-core/src/data/icons.json');
const fabricReactIcons = require('@uifabric/icons/lib/data/AllIconNames.json');
// en dashes look like regular dashes in a monospace font
const enDash = '–';

export const FabricIconsPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...FabricIconsPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Usage',
          editUrl: `${baseUrl}/web/FabricIconsUsage.md`,
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsUsage.md') as string,
          jumpLinks: [
            // prettier-ignore
            { text: enDash + ' Fabric React', url: 'fabric-react' },
            { text: enDash + ' Fabric Core', url: 'fabric-core' },
            { text: enDash + ' Fabric Icons tool', url: 'fabric-icons-tool' }
          ]
        },

        {
          sectionName: 'Available icons',
          content: (
            <Pivot>
              <PivotItem headerText="Fabric React" className={styles.iconGrid}>
                <IconGrid icons={fabricReactIcons} useFabricIcons={true} />
              </PivotItem>
              <PivotItem headerText="Fabric Core" className={styles.iconGrid}>
                <IconGrid icons={fabricCoreIcons} />
              </PivotItem>
            </Pivot>
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
