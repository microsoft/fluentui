import * as React from 'react';
import { DefaultButton as ButtonFabric } from 'office-ui-fabric-react';
import { Button as ButtonFluent } from '@fluentui/react-northstar';

export default {
  iterations: 5000,
};

export const Fabric = () => <ButtonFabric />;
export const Fluent = () => <ButtonFluent />;
