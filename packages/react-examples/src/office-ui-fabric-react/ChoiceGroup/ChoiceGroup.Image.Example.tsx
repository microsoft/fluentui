import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TestImages } from '@uifabric/example-data';

const options: IChoiceGroupOption[] = [
  {
    key: 'bar',
    imageSrc: TestImages.choiceGroupBarUnselected,
    imageAlt: 'Bar chart icon',
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Clustered bar chart', // This text is long to show text wrapping.
  },
  {
    key: 'pie',
    imageSrc: TestImages.choiceGroupBarUnselected,
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Pie chart',
  },
];

export const ChoiceGroupImageExample: React.FunctionComponent = () => {
  return <ChoiceGroup label="Pick one image" defaultSelectedKey="bar" options={options} />;
};
