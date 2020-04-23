import * as React from 'react';
import { IPageSectionProps, Markdown } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LinkPageProps } from './LinkPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/LinkPage';

export const LinkPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      {...LinkPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'windows':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/windows/LinkImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/windows/LinkImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'mac':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/mac/LinkImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/mac/LinkImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];
  }
}
