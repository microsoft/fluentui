import * as React from 'react';
import * as _ from 'lodash';
import { Text, ProviderConsumer } from '@fluentui/react-northstar';

const TextExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { contextualColors, naturalColors } }) =>
      _.keys({ ...contextualColors, ...naturalColors }).map(color => (
        <React.Fragment key={color}>
          <Text color={color}>{_.startCase(color)}</Text>
          <br />
        </React.Fragment>
      ))
    }
  />
);

export default TextExampleColor;
