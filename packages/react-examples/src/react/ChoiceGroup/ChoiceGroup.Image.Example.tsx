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
  return (
    <>
      <ChoiceGroup label="Pick one image" defaultSelectedKey="bar" options={options} />
      <p>
        Warning: this ChoiceGroup option layout restricts the space that label text has to expand and wrap. This can
        cause issues for accessibility, when zoom and text spacing increase the length of words and lines, and also
        internationalization, since translated text length will vary.
      </p>
      <p>We recommend using the standard layout with an inline image for labels longer than a single short word.</p>
    </>
  );
};
