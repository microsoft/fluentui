import * as React from 'react';
import { Slider as SliderFabric } from '@fluentui/react';
import { Slider as SliderFluent } from '@fluentui/react-northstar';

export default {
  iterations: 1000,
};

export const Fabric = () => <SliderFabric />;
export const Fluent = () => <SliderFluent />;
