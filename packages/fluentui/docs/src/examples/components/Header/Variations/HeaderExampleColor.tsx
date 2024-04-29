import * as React from 'react';
import * as _ from 'lodash';
import { Header, ProviderConsumer } from '@fluentui/react-northstar';

const HeaderExampleColor = () => (
  <ProviderConsumer
    render={({ siteVariables: { contextualColors, naturalColors } }) =>
      _.keys({ ...contextualColors, ...naturalColors }).map(color => (
        <Header key={color} as="h4" color={color}>
          {_.startCase(color)}
          <Header.Description color={color}>{`Description of ${_.lowerCase(color)} color`}</Header.Description>
        </Header>
      ))
    }
  />
);

export default HeaderExampleColor;
