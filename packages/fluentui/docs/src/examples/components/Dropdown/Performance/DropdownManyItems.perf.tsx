import { Dropdown } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

const inputItems = _.times(300, (i: number) => ({
  content: `content: ${i}`,
  key: i,
  header: `header: ${i}`,
}));

const DropdownManyItemsPerf = () => <Dropdown defaultOpen items={inputItems} placeholder="Select your hero" />;

DropdownManyItemsPerf.iterations = 5;
DropdownManyItemsPerf.filename = 'DropdownManyItems.perf.tsx';

export default DropdownManyItemsPerf;
