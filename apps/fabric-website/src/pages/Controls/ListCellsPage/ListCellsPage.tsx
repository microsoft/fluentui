import * as React from 'react';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ListCellsPageProps } from './ListCellsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ListCellsPage/';

export const ListCellsPage: React.StatelessComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="List Cells"
      {...ListCellsPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/ListCellsImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ListCellsPage/docs/ios/ListCellsImplementation.md') as string
        }
      ];
    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/ListCellsImplementation.md',
          content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ListCellsPage/docs/android/ListCellsImplementation.md') as string
        }
      ];
  }
}
