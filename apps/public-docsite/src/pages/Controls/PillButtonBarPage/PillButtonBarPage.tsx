import * as React from 'react';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PillButtonBarPageProps } from './PillButtonBarPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/PillButtonBarPage/';

export const PillButtonBarPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <ControlsAreaPage
      {...props}
      {...PillButtonBarPageProps[props.platform]}
      otherSections={_otherSections(props.platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform?: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/PillButtonBarImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PillButtonBarPage/docs/ios/PillButtonBarImplementation.md') as string,
        },
      ];
  }
}
