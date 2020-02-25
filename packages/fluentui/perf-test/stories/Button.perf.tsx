import * as React from 'react';
import { DefaultButton as ButtonFabric } from 'office-ui-fabric-react';
import { Button as ButtonFluent } from '@fluentui/react';

export default {
  iterations: 1000
};

export const Fabric = () => <ButtonFabric />;
export const Fluent = () => <ButtonFluent />;
