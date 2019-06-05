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
const themeColors = require<IColorSwatch[]>('@uifabric/fabric-website/lib/data/colors-theme-slots.json');

export const ThemeSlotsPageBase: React.StatelessComponent<IThemeSlotsPageProps> = props => {
  return (
    <PlatformContext.Consumer>
      {(platform: Platforms) => {
        const { theme, styles, className } = props;

        const classNames = getClassNames(styles, { theme, className });

        return (
          <Page
            // Pass all the props to the Page component.
            {...props}
            // Set default page title
            title="Theme Slots"
            // Use the platform specific props from the doc.ts file.
            {...ThemeSlotsPageProps[platform]}
            // Use the getSubTitle helper function to get the page header subtitle from the active platform.
            subTitle={getSubTitle(platform)}
            // You can define custom sections using the `otherSections` prop. Here it is using a method that takes the platform as an argument to return the correct array of section props.
            otherSections={_otherSections(platform)}
            // You can pass a custom className to the page wrapper if needed.
            className={classNames.root}

            // You can hide the side rail by setting `showSideRail` to false.
            // showSideRail={false}
          />
        );
      }}
    </PlatformContext.Consumer>
  );
};

// Method that returns array of sections. Renders in the order defined.
function _otherSections(platform: Platforms): IPageSectionProps[] {
  // Use a switch statement to define the sections for each platform.
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Color palettes',
          content: (
            <>
              <MarkdownHeader as="h3">Theme colors</MarkdownHeader>
              <ColorPalette colors={themeColors} />
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
