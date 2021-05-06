import * as React from 'react';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuPersistedExample: React.FunctionComponent = () => {
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true,
    items: [
      { key: 'rename', text: 'Rename', onClick: () => console.log('Rename clicked') },
      { key: 'edit', text: 'Edit', onClick: () => console.log('Edit clicked') },
      { key: 'properties', text: 'Properties', onClick: () => console.log('Properties clicked') },
      { key: 'linkNoTarget', text: 'Link same window', href: 'http://bing.com' },
      { key: 'linkWithTarget', text: 'Link new window', href: 'http://bing.com', target: '_blank' },
      { key: 'disabled', text: 'Disabled item', disabled: true },
    ],
  }));

  return <DefaultButton text="Click for ContextualMenu" persistMenu menuProps={menuProps} />;
};
