import * as _ from 'lodash';
import * as React from 'react';
import { Divider, ProviderConsumer } from '@fluentui/react-northstar';

const DividerExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { contextualColors, naturalColors } }) =>
      _.map({ ...contextualColors, ...naturalColors }, (variants, name) => (
        <Divider key={name} color={name} content={_.startCase(name)} />
      ))
    }
  />
);

export default DividerExampleColor;
