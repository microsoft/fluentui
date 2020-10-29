import * as React from 'react';
import { IPageSectionProps, Markdown } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TabsPageProps } from './TabsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TabsPage/';

export const TabsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <ControlsAreaPage
      {...props}
      {...TabsPageProps[props.platform]}
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
          editUrl: baseUrl + 'docs/ios/TabsImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TabsPage/docs/ios/TabsImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];
  }
}
