import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SeparatorPageProps } from './SeparatorPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/SeparatorPage/';

export const SeparatorPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage {...props} title="Separator" {...SeparatorPageProps[platform]} otherSections={_otherSections(platform) as any} />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/SeparatorImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/ios/SeparatorImplementation.md') as string
        }
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/SeparatorImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/android/SeparatorImplementation.md') as string
        }
      ];
  }
}
