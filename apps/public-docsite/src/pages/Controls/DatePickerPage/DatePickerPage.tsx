import * as React from 'react';
import { IPageSectionProps, Markdown } from '@fluentui/react-docsite-components/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DatePickerPageProps } from './DatePickerPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/DatePickerPage/';

export const DatePickerPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      {...DatePickerPageProps[platform!]}
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
          editUrl: baseUrl + 'docs/ios/DateTimePickerImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/ios/DateTimePickerImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/DateTimePickerImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/android/DateTimePickerImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];

    case 'mac':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/mac/DatePickerImplementation.md',
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/mac/DatePickerImplementation.md') as string
              }
            </Markdown>
          ),
        },
      ];
  }
}
