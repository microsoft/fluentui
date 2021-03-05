import * as React from 'react';
import { Checkbox as CheckboxFabric } from '@fluentui/react';
import { Checkbox as CheckboxFluent } from '@fluentui/react-northstar';

export default {
  iterations: 1000,
};

export const Fabric = () => <CheckboxFabric />;
export const Fluent = () => <CheckboxFluent />;
