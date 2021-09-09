import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { ITextFieldStyles, TextField } from '@fluentui/react';

const textFieldStyles: Partial<ITextFieldStyles> = {
  subComponentStyles: {
    label: { root: { display: 'inline-block', marginRight: '10px' } },
  },
  fieldGroup: { display: 'inline-flex', maxWidth: '100px' },
  wrapper: { display: 'block', marginBottom: '10px' },
};

export const ContextualMenuAsyncMenuExample: React.FunctionComponent = () => {
  const [loadingDelay, setLoadingDelay] = React.useState(1000);

  const onLoadingDelayChanged = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
      setLoadingDelay(Number(newValue) || 0);
    },
    [],
  );

  async function getItems() {
    await new Promise(resolve => setTimeout(resolve, loadingDelay));
    return [
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
        subMenuProps: getShareSubmenuProps,
        text: 'Sharing',
        ariaLabel: 'Sharing. Press enter, space or right arrow keys to open submenu.',
      },
      {
        key: 'navigation',
        itemType: ContextualMenuItemType.Header,
        text: 'Navigation',
      },
      { key: 'properties', text: 'Properties' },
      { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
      { key: 'Bing', text: 'Go to Bing', href: 'http://www.bing.com', target: '_blank' },
    ] as const;
  }

  async function getShareSubmenuProps() {
    await new Promise(resolve => setTimeout(resolve, loadingDelay));
    return {
      items: [
        { key: 'sharetoemail', text: 'Share to Email', iconProps: { iconName: 'Mail' } },
        { key: 'sharetofacebook', text: 'Share to Facebook' },
        { key: 'sharetotwitter', text: 'Share to Twitter', iconProps: { iconName: 'Share' } },
      ],
    };
  }

  return (
    <div>
      <TextField
        value={String(loadingDelay)}
        label="Loading delay (ms)"
        type="number"
        onChange={onLoadingDelayChanged}
        styles={textFieldStyles}
      />
      <DefaultButton
        text="Click for ContextualMenu"
        menuProps={{
          shouldFocusOnMount: true,
          items: getItems,
        }}
      />
    </div>
  );
};
