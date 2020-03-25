import * as React from 'react';
import { Flex, Icon } from '@fluentui/react-northstar';
import { rosterTitleIconStyles } from './styles/styles';

export const RosterSectionTitle: React.FunctionComponent<{ children?: string; open: boolean }> = ({
  children,
  ...restProps
}) => {
  return (
    <Flex {...restProps}>
      {/* Better way to check this expand? */}
      <Icon name={restProps['aria-expanded'] ? 'icon-arrow-down' : 'icon-arrow-end'} styles={rosterTitleIconStyles} />
      {children}
    </Flex>
  );
};
