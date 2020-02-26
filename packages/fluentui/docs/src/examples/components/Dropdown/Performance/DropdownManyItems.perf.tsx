import { Dropdown } from '@fluentui/react';
import * as _ from 'lodash';
import * as React from 'react';

const inputItems = _.times(300, (i: number) => ({
  content: `content: ${i}`,
  key: i,
  header: `header: ${i}`
}));

const DropdownManyItemsPerf = () => <Dropdown defaultOpen items={inputItems} placeholder="Select your hero" />;

DropdownManyItemsPerf.filename = 'DropdownManyItems.perf.tsx';

export default DropdownManyItemsPerf;
