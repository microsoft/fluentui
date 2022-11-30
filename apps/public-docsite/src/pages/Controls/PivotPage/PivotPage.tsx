import * as React from 'react';
import { IPageSectionProps, Markdown } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PivotPageProps } from './PivotPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PivotPage/';

export const PivotPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <ControlsAreaPage
      {...props}
      {...PivotPageProps[props.platform!]}
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
          editUrl: baseUrl + 'docs/ios/PivotImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PivotPage/docs/ios/PivotImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];
  }
}
