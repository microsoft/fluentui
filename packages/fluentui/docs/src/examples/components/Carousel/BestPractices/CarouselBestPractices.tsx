import * as React from 'react';
import { Text, Box } from '@fluentui/react-northstar';
import { link } from '../../../../utils/helpers';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  <Text>
    'Add textual representation for `CarouselItem`. Use `aria-label` attribute ( refer to{' '}
    {link('reported issue', 'https://bugs.chromium.org/p/chromium/issues/detail?id=1040924')} for details).
  </Text>,
  'Provide localized string for items positioning using `getItemPositionText` prop.',
  'Provide localized string of the "carousel" using `aria-roledescription` prop.',
  'Provide label to the carousel using `aria-label` prop.',
  <Box>
    If carousel contains `navigation`:
    <ul>
      <li> provide label to each carousel item using `aria-label` attribute</li>
      <li> provide label to `navigation` slot and to navigation item using `aria-label` attribute</li>
      <li> add `aria-controls` attribute to navigation item referencing to `carouselItem` id </li>
    </ul>
  </Box>,
];

const CarouselBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default CarouselBestPractices;
