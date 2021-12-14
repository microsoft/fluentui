import * as React from 'react';
import { Pivot, PivotItem, Spinner } from '@fluentui/react';
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
const ReactIconGrid = React.lazy(() => import('../../../components/ReactIconGrid/ReactIconGrid'));

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

const fontIconsHeaderText = 'Fluent UI React (font-based)';
const reactIconsHeaderText = 'React Icons';

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  const [isReactIcons, setIsReactIcons] = React.useState(false);
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
            <Pivot
              onLinkClick={item => {
                setIsReactIcons(item.props.headerText === reactIconsHeaderText);
              }}
            >
              <PivotItem headerText={fontIconsHeaderText} className={styles.iconGrid}>
                <IconGrid icons={fabricReactIcons} useFabricIcons={true} />
              </PivotItem>
              <PivotItem headerText="Fabric Core" className={styles.iconGrid}>
                <IconGrid icons={fabricCoreIcons} />
              </PivotItem>
              <PivotItem headerText={reactIconsHeaderText} className={styles.iconGrid}>
                {isReactIcons && (
                  <React.Suspense fallback={<Spinner label="Loading..." />}>
                    <ReactIconGrid />
                  </React.Suspense>
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
