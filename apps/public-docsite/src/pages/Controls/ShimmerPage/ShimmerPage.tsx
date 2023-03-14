import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ShimmerPageProps } from './ShimmerPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ShimmerPage/';

export const ShimmerPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Shimmer"
      {...ShimmerPageProps[platform!]}
      otherSections={_otherSections(platform!) as any}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/ShimmerImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ShimmerPage/docs/ios/ShimmerImplementation.md') as string,
        },
      ];
  }
}
