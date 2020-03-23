import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TextPageProps } from './TextPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/TextPage/';

export const TextPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Text"
      {...TextPageProps[props.platform]}
      otherSections={_otherSections(platform) as any}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/TextImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextPage/docs/ios/TextImplementation.md') as string,
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/TextImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextPage/docs/android/TextImplementation.md') as string,
        },
      ];
  }
}
