import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react-next/lib/ChoiceGroup';
import { TestImages } from '@uifabric/example-data';

const options: IChoiceGroupOption[] = [
  {
    optionKey: 'bar',
    imageSrc: TestImages.choiceGroupBarUnselected,
    imageAlt: 'Bar chart icon',
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Clustered bar chart', // This text is long to show text wrapping.
  },
  {
    optionKey: 'pie',
    imageSrc: TestImages.choiceGroupBarUnselected,
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Pie chart',
  },
];

export const ChoiceGroupImageExample: React.FunctionComponent = () => {
  return <ChoiceGroup label="Pick one image" defaultSelectedKey="bar" options={options} />;
};
