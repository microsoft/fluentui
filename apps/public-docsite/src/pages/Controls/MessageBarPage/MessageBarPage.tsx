import * as React from 'react';
import { IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MessageBarPageProps } from './MessageBarPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/MessageBarPage/';

export const MessageBarPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <ControlsAreaPage
      {...props}
      {...MessageBarPageProps[props.platform!]}
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
          editUrl: baseUrl + 'docs/ios/MessageBarImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/MessageBarPage/docs/ios/MessageBarImplementation.md') as string,
        },
      ];
  }
}
