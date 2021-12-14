import { DefaultButton, PrimaryButton } from '@fluentui/react';
import React from 'react';

type Props = {};

export const PrimaryButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Primary Button</div>
      <div className="description">v8: DefaultButton, PrimaryButton --&gt; v9: Button</div>
      <div className="controls row">
        <PrimaryButton>Primary</PrimaryButton>
        <DefaultButton primary>Primary</DefaultButton>
      </div>
    </div>
  );
};
