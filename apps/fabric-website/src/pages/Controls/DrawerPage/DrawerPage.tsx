import * as React from 'react';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DrawerPageProps } from './DrawerPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/DrawerPage/';

export const DrawerPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Drawer"
      {...DrawerPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/DrawerImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/ios/DrawerImplementation.md') as string
        }
      ];
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/DrawerImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/android/DrawerImplementation.md') as string
        }
      ];
  }
}
