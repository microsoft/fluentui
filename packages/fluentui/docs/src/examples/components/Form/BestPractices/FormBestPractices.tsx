import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link, code } from '../../../../utils/helpers';
import { Text } from '@fluentui/react-northstar';

const doList = [
  'Provide label by using `aria-label`, or `aria-labelledby` prop.',
  <Text>
    Do attach label to each input element - by using {code('FormField')} component or property on the input. See{' '}
    {link('label element documentation', 'https://www.w3schools.com/tags/tag_label.asp')} for details.
  </Text>,
  'Do use `aria-labelledby="labelID messageID"` in the input when using chidlren api',
];

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default DropdownBestPractices;
