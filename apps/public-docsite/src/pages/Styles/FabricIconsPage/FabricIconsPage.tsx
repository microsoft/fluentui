import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { ReactIconGrid } from '../../../components/ReactIconGrid/ReactIconGrid';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { FabricIconsPageProps } from './FabricIconsPage.doc';
import * as styles from './FabricIconsPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';
import { FluentIconsProps } from '@fluentui/react-icons';
import * as ReactIcons from '@fluentui/react-icons';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/FabricIconsPage/docs';
const fabricCoreIcons = require('office-ui-fabric-core/src/data/icons.json');
const fabricReactIcons = require('@fluentui/font-icons-mdl2/lib/data/AllIconNames.json');
// en dashes look like regular dashes in a monospace font
const enDash = '–';

export const FabricIconsPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...FabricIconsPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  const icons: React.FC<FluentIconsProps>[] = [];
  // eslint-disable-next-line guard-for-in
  for (const iconName in ReactIcons) {
    icons.push(ReactIcons[iconName]);
  }
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Usage',
          editUrl: `${baseUrl}/web/FabricIconsUsage.md`,
          content: require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsUsage.md') as string,
          jumpLinks: [
            // prettier-ignore
            { text: enDash + ' React Icons (SVG)', url: 'react-icons-svg-based-icons'},
            { text: enDash + ' Fluent UI React (font)', url: 'fluent-ui-react-font-based-icons' },
            { text: enDash + ' Fluent UI React (SVG)', url: 'fluent-ui-react-svg-based-icons' },
            { text: enDash + ' Fabric Core', url: 'fabric-core' },
            { text: enDash + ' Fluent UI Icons tool', url: 'fluent-ui-icons-tool' },
          ],
        },

        {
          sectionName: 'Available icons',
          content: (
            <Pivot>
              <PivotItem headerText="Fluent UI React (font-based)" className={styles.iconGrid}>
                <IconGrid icons={fabricReactIcons} useFabricIcons={true} />
              </PivotItem>
              <PivotItem headerText="Fabric Core" className={styles.iconGrid}>
                <IconGrid icons={fabricCoreIcons} />
              </PivotItem>
              <PivotItem headerText="React Icons" className={styles.iconGrid}>
                <ReactIconGrid icons={icons} />
              </PivotItem>
            </Pivot>
          ),
        },
      ];

    default:
      return [
        {
          sectionName: 'Coming Soon',
          content: 'Coming Soon',
        },
      ];
  }
}
