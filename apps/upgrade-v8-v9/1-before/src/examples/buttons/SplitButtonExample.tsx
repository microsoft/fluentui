import { DefaultButton, IContextualMenuProps } from '@fluentui/react';
import React from 'react';

type Props = {};

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
};

export const SplitButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Split Button</div>
      <div className="description">v8: DefaultButton, PrimaryButton --&gt; v9: SplitButton</div>
      <div className="controls row">
        <DefaultButton
          text="Standard"
          split
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          menuProps={menuProps}
        />
        <DefaultButton
          text="Primary"
          primary
          split
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          menuProps={menuProps}
        />
      </div>
    </div>
  );
};
