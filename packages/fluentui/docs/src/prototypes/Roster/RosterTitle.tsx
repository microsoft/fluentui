import * as React from 'react';
import { Flex, Icon } from '@fluentui/react-northstar';
import { rosterTitleIconStyles } from './styles/styles';

export const RosterSectionTitle: (Component, props) => React.ReactNode = (
  Component,
  { expanded, key, ...restProps },
) => {
  return (
    <Flex key={key}>
      <Icon name={expanded ? 'icon-arrow-down' : 'icon-arrow-end'} styles={rosterTitleIconStyles} />
      <Component {...restProps} />
    </Flex>
  );
};
