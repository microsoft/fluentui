import * as React from 'react';
import { Text as TextFabric } from 'office-ui-fabric-react';
import { Text as TextFluent } from '@fluentui/react-northstar';

export default {
  iterations: 5000,
};

export const Fabric = () => <TextFabric />;
export const Fluent = () => <TextFluent />;
