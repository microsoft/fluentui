import * as React from 'react';
import { RosterSectionType } from './interface/roster.interface';
import { Flex, Icon } from '@fluentui/react';
import { rosterTitleIconStyles } from './styles/styles';

export const RosterSectionTitle: React.FunctionComponent<{ type: RosterSectionType }> = ({ type }) => {
  const [isToggled, setToggled] = React.useState(true);
  return (
    <Flex onClick={() => setToggled(!isToggled)}>
      <Icon name={isToggled ? 'icon-arrow-down' : 'icon-arrow-end'} styles={rosterTitleIconStyles} />
      {(type as string).charAt(0).toUpperCase() + (type as string).slice(1)}
    </Flex>
  );
};
