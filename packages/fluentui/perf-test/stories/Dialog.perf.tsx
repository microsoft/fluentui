import * as React from 'react';
import { Dialog as DialogFabric } from '@fluentui/react';
import { Dialog as DialogFluent } from '@fluentui/react-northstar';

export default {
  iterations: 5000,
};

export const Fabric = () => <DialogFabric />;
export const Fluent = () => <DialogFluent />;
