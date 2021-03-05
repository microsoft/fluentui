import * as React from 'react';
import { Dropdown as DropdownFabric } from '@fluentui/react';
import { Dropdown as DropdownFluent } from '@fluentui/react-northstar';

export default {
  iterations: 1000,
};

export const Fabric = () => <DropdownFabric options={[]} />;
export const Fluent = () => <DropdownFluent items={[]} />;
