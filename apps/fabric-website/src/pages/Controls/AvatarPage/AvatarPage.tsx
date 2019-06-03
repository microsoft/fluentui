import * as React from 'react';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AvatarPageProps } from './AvatarPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/AvatarPage/';

export const AvatarPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Avatar"
      {...AvatarPageProps[platform]}
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
          editUrl: baseUrl + 'docs/ios/AvatarImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/ios/AvatarImplementation.md') as string
        }
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/AvatarImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/android/AvatarImplementation.md') as string
        }
      ];
  }
}
