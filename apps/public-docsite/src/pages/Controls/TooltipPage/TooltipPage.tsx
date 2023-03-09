import * as React from 'react';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TooltipPageProps } from './TooltipPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TooltipPage/';

export const TooltipPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <ControlsAreaPage
      {...props}
      title="Tooltip"
      {...TooltipPageProps[props.platform!]}
      otherSections={_otherSections(props.platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform?: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/TooltipImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/android/TooltipImplementation.md') as string,
        },
      ];
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/TooltipImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/ios/TooltipImplementation.md') as string,
        },
      ];
  }
}
