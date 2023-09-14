import * as React from 'react';
import { classNamesFunction } from '@fluentui/react';
import {
  Page,
  PlatformContext,
  IPageSectionProps,
  MarkdownHeader,
  ColorPalette,
  IColorSwatch,
} from '@fluentui/react-docsite-components/lib/index2';
import { Platforms } from '../../../interfaces/Platforms';
import { getSubTitle } from '../../../utilities/index';
import { IThemeSlotsPageProps, IThemeSlotsPageStyles, IThemeSlotsPageStyleProps } from './ThemeSlotsPage.types';
import { ThemeSlotsPageProps } from './ThemeSlotsPage.doc';

const getClassNames = classNamesFunction<IThemeSlotsPageStyleProps, IThemeSlotsPageStyles>();
const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/ThemeSlotsPage/docs';

// Color palettes
/* eslint-disable import/no-extraneous-dependencies */
const themeColors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-theme-slots.json');
const neutralColors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-theme-neutrals.json');
const accentColors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-theme-accents.json');
/* eslint-enable import/no-extraneous-dependencies */

export const ThemeSlotsPageBase: React.FunctionComponent<IThemeSlotsPageProps> = props => {
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
          ),
        },
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'web/ThemeSlotsImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsImplementation.md') as string,
        },
      ];

    default:
      return [];
  }
}
