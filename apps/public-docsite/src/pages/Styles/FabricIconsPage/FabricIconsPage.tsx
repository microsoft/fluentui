import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { FabricIconsPageProps } from './FabricIconsPage.doc';
import * as styles from './FabricIconsPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

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
      {...FabricIconsPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  const [selectedItem, setSelectedItem] = React.useState('react-font');
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Usage: Font icons',
          editUrl: `${baseUrl}/web/FabricIconsUsage.md`,
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsUsage.md') as string,
          jumpLinks: [
            { text: enDash + ' Fluent UI React', url: 'fluent-ui-react' },
            { text: enDash + ' Fabric Core', url: 'fabric-core' },
            { text: enDash + ' Fluent UI Icons tool', url: 'fluent-ui-icons-tool' },
          ],
        },

        {
          sectionName: 'Usage: SVG icons',
          editUrl: `${baseUrl}/web/FabricIconsSvgUsage.md`,
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsSvgUsage.md') as string,
        },

        {
          sectionName: 'Available icons',
          content: (
            <Pivot
              onLinkClick={item => {
                setSelectedItem(item!.props.itemKey!);
              }}
            >
              <PivotItem headerText="Fluent UI React (font)" itemKey="react-font" className={styles.iconGrid}>
                <IconGrid icons={fabricReactIcons} iconType="react-font" />
              </PivotItem>
              <PivotItem headerText="Fabric Core" itemKey="core-font" className={styles.iconGrid}>
                <IconGrid icons={fabricCoreIcons} iconType="core-font" />
              </PivotItem>
              <PivotItem headerText="SVG icons" itemKey="svg" className={styles.iconGrid}>
                {
                  // The icon components are a large download and slow to render, so wait until the tab is clicked
                  selectedItem === 'svg' && (
                    <IconGrid icons={import('@fluentui/react-icons-mdl2')} iconType="react-svg" />
                  )
                }
              </PivotItem>
              <PivotItem headerText="SVG icons (products)" itemKey="svg-branded" className={styles.iconGrid}>
                {selectedItem === 'svg-branded' && (
                  <IconGrid icons={import('@fluentui/react-icons-mdl2-branded')} iconType="react-svg" />
                )}
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
