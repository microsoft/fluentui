import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuHeaderExample: React.FunctionComponent = () => {
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    items: [
      {
        key: 'Actions',
        itemType: ContextualMenuItemType.Header,
        text: 'Actions',
        itemProps: { lang: 'en-us' },
      },
      {
        key: 'upload',
        iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
        text: 'Upload',
        title: 'Upload a file',
      },
      { key: 'rename', text: 'Rename' },
      {
        key: 'share',
        iconProps: { iconName: 'Share' },
        subMenuProps: {
          items: [
            { key: 'sharetoemail', text: 'Share to Email', iconProps: { iconName: 'Mail' } },
            { key: 'sharetofacebook', text: 'Share to Facebook' },
            { key: 'sharetotwitter', text: 'Share to Twitter', iconProps: { iconName: 'Share' } },
          ],
        },
        text: 'Sharing',
      },
      {
        key: 'navigation',
        itemType: ContextualMenuItemType.Header,
        text: 'Navigation',
      },
      { key: 'properties', text: 'Properties' },
      { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
      { key: 'Bing', text: 'Go to Bing', href: 'http://www.bing.com', target: '_blank' },
    ],
  }));

  return (
    <>
      <p>
        Note: this example demonstrates how to use the Header menu item type as a standalone menu item. For semantically
        grouped options, refer to the <code>Contextual Menu with section headers</code> example.
      </p>
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
    </>
  );
};
