import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import {
  IContextualMenuProps,
  IContextualMenuItemProps,
  IContextualMenuItemRenderFunctions,
} from '@fluentui/react/lib/ContextualMenu';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuIconCustomLayoutExample: React.FunctionComponent = () => {
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    styles: {
      subComponentStyles: {
        menuItem: {
          root: { height: 'unset' },
          label: { margin: '0', fontSize: '14px', lineHeight: '18px' },
          secondaryText: { paddingLeft: '0', textAlign: 'left', fontSize: '10px', lineHeight: '14px' },
        },
      },
    },
    items: [
      {
        key: 'Later Today',
        iconProps: { iconName: 'Clock' },
        text: 'Later Today',
        secondaryText: '7:00 PM',
        onRenderContent: renderContent,
      },
      {
        key: 'Tomorrow',
        iconProps: { iconName: 'Coffeescript' },
        text: 'Tomorrow',
        secondaryText: 'Thu. 8:00 AM',
        onRenderContent: renderContent,
      },
      {
        key: 'This Weekend',
        iconProps: { iconName: 'Vacation' },
        text: 'This Weekend',
        secondaryText: 'Sat. 10:00 AM',
        onRenderContent: renderContent,
      },
      {
        key: 'Next Week',
        iconProps: { iconName: 'Suitcase' },
        text: 'Next Week',
        secondaryText: 'Mon. 8:00 AM',
        onRenderContent: renderContent,
      },
    ],
  }));

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const renderContent = (props: IContextualMenuItemProps, defaultRenders: IContextualMenuItemRenderFunctions) => {
  return (
    <>
      {defaultRenders.renderCheckMarkIcon(props)}
      {defaultRenders.renderItemIcon(props)}
      <div style={{ display: 'flex', flexDirection: 'column', margin: '8px 4px' }}>
        {defaultRenders.renderItemName(props)}
        {defaultRenders.renderSecondaryText(props)}
      </div>
      {defaultRenders.renderSubMenuIcon(props)}
    </>
  );
};
