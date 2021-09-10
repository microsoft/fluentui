import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TestImages } from '@fluentui/example-data';

const options: IChoiceGroupOption[] = [
  {
    key: 'bar',
    imageSrc: TestImages.choiceGroupBarUnselected,
    imageAlt: 'Bar chart',
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Bar',
  },
  {
    key: 'pie',
    imageSrc: TestImages.choiceGroupPieUnselected,
    imageAlt: 'Pie chart',
    selectedImageSrc: TestImages.choiceGroupPieSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Pie',
  },
];

export const ChoiceGroupImageExample: React.FunctionComponent = () => {
  return <ChoiceGroup label="Pick one image" defaultSelectedKey="bar" options={options} />;
};
