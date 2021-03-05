import * as PropTypes from 'prop-types';
import * as React from 'react';

import { NestingChild } from './NestingChild';
import { NestingContext } from './NestingContext';
import { NestingRoot } from './NestingRoot';
import { NestingProps } from './types';

export const NestingAuto: React.FC<NestingProps> = props => (
  <NestingContext.Consumer>
    {contextValue => {
      const hasContext = !!contextValue;
      const Component = hasContext ? NestingChild : NestingRoot;

      return React.createElement(Component, props);
    }}
  </NestingContext.Consumer>
);

NestingAuto.displayName = 'NestingAuto';
NestingAuto.propTypes = {
  children: PropTypes.func.isRequired,
};
