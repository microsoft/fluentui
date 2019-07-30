import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react';
import {
  Page,
  PlatformContext,
  IPageSectionProps,
  MarkdownHeader,
  ColorPalette,
  IColorSwatch
} from '@uifabric/example-app-base/lib/index2';
import { Platforms } from '../../../interfaces/Platforms';
import { getSubTitle } from '../../../utilities/index';
import { IThemeSlotsPageProps, IThemeSlotsPageStyles, IThemeSlotsPageStyleProps } from './ThemeSlotsPage.types';
import { ThemeSlotsPageProps } from './ThemeSlotsPage.doc';

const getClassNames = classNamesFunction<IThemeSlotsPageStyleProps, IThemeSlotsPageStyles>();
const baseUrl = 'https://onedrive.visualstudio.com/Design/_git/ui-fabric-website?path=/apps/fabric-website/src/pages/Styles/';

// Color palettes
const themeColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-theme-slots.json');
const neutralColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-theme-neutrals.json');
const accentColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-theme-accents.json');

export const ThemeSlotsPageBase: React.StatelessComponent<IThemeSlotsPageProps> = props => {
  const { theme, styles, className } = props;
  const classNames = getClassNames(styles, { theme, className });

  return (
    <PlatformContext.Consumer>
      {(platform: Platforms) => {
        return (
          <Page
            {...props}
            title="Theme Slots"
            {...ThemeSlotsPageProps[platform]}
            subTitle={getSubTitle(platform)}
            otherSections={_otherSections(platform)}
            className={classNames.root}
          />
        );
      }}
    </PlatformContext.Consumer>
  );
};

// Method that returns array of sections. Renders in the order defined.
function _otherSections(platform: Platforms): IPageSectionProps[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Color palettes',
          content: (
            <>
              <MarkdownHeader as="h3">Theme colors</MarkdownHeader>
              <ColorPalette colors={themeColors} />

              <MarkdownHeader as="h3">Neutral colors</MarkdownHeader>
              <ColorPalette colors={neutralColors} />

              <MarkdownHeader as="h3">Accent colors</MarkdownHeader>
              <ColorPalette colors={accentColors} />
            </>
          )
        },
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/web/ThemeSlotsImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsImplementation.md') as string
        }
      ];

    default:
      return [];
  }
}
