import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SpinnerPageProps } from './SpinnerPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';

export const SpinnerPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Spinner"
      {...SpinnerPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl:
            'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SpinnerPage/docs/ios/SpinnerImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/ios/SpinnerImplementation.md') as string,
        },
      ];
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl:
            'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SpinnerPage/docs/android/SpinnerImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/android/SpinnerImplementation.md') as string,
        },
      ];
  }
}
