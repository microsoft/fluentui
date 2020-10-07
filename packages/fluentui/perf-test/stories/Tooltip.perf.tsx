import * as React from 'react';
import { Tooltip as TooltipFabric } from '@fluentui/react';
import { Tooltip as TooltipFluent } from '@fluentui/react-northstar';

export default {
  iterations: 5000,
};

export const Fabric = () => <TooltipFabric />;
export const Fluent = () => <TooltipFluent />;
