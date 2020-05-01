import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export const ContextualMenuIconSecondaryTextExample: React.FunctionComponent = () => {
  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'Later Today',
    iconProps: {
      iconName: 'Clock',
    },
    text: 'Later Today',
    secondaryText: '7:00 PM',
  },
  {
    key: 'Tomorrow',
    iconProps: {
      iconName: 'Coffeescript',
    },
    text: 'Tomorrow',
    secondaryText: 'Thu. 8:00 AM',
  },
  {
    key: 'This Weekend',
    iconProps: {
      iconName: 'Vacation',
    },
    text: 'This Weekend',
    secondaryText: 'Sat. 10:00 AM',
  },
  {
    key: 'Next Week',
    iconProps: {
      iconName: 'Suitcase',
    },
    text: 'Next Week',
    secondaryText: 'Mon. 8:00 AM',
  },
];

const menuProps: IContextualMenuProps = {
  shouldFocusOnMount: true,
  items: menuItems,
};
