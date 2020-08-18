import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  IContextualMenuProps,
  IContextualMenuItem,
  IContextualMenuItemProps,
  IContextualMenuItemRenderFunctions,
} from 'office-ui-fabric-react/lib/ContextualMenu';

export const ContextualMenuIconCustomLayoutExample: React.FunctionComponent = () => {
  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const renderContent = (props: IContextualMenuItemProps, defaultRenders: IContextualMenuItemRenderFunctions) => {
  return (
    <>
      {defaultRenders.renderCheckMarkIcon(props)}
      {defaultRenders.renderItemIcon(props)}
      <div className={'ms-ContextualMenu-renderContentCustomizationExample-textWrapper'}>
        {defaultRenders.renderItemName(props)}
        {defaultRenders.renderSecondaryText(props)}
      </div>
      {defaultRenders.renderSubMenuIcon(props)}
    </>
  );
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'Later Today',
    iconProps: {
      iconName: 'Clock',
    },
    text: 'Later Today',
    secondaryText: '7:00 PM',
    onRenderContent: renderContent,
  },
  {
    key: 'Tomorrow',
    iconProps: {
      iconName: 'Coffeescript',
    },
    text: 'Tomorrow',
    secondaryText: 'Thu. 8:00 AM',
    onRenderContent: renderContent,
  },
  {
    key: 'This Weekend',
    iconProps: {
      iconName: 'Vacation',
    },
    text: 'This Weekend',
    secondaryText: 'Sat. 10:00 AM',
    onRenderContent: renderContent,
  },
  {
    key: 'Next Week',
    iconProps: {
      iconName: 'Suitcase',
    },
    text: 'Next Week',
    secondaryText: 'Mon. 8:00 AM',
    onRenderContent: renderContent,
  },
];

const menuProps: IContextualMenuProps = {
  shouldFocusOnMount: true,
  items: menuItems,
  styles: {
    subComponentStyles: {
      menuItem: {
        root: {
          height: 'unset',
        },
        label: {
          margin: '0',
          fontSize: '14px',
          lineHeight: '18px',
        },
        secondaryText: {
          paddingLeft: '0',
          textAlign: 'left',
          fontSize: '10px',
          lineHeight: '14px',
        },
      },
    },
  },
};

/**
 * Included CSS:
 *
 * .ms-ContextualMenu-renderContentCustomizationExample-textWrapper {
 *   display: flex;
 *   flex-direction: column;
 *   margin: 8px 4px;
 * }
 */
