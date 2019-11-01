import * as React from 'react';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { NavBarPageProps } from './NavBarPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/NavBarPage/';

export const NavBarPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...NavBarPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/NavBarImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavBarPage/docs/ios/NavBarImplementation.md') as string
        }
      ];
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/NavBarImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavBarPage/docs/android/NavBarImplementation.md') as string
        }
      ];
  }
}
