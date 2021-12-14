import React from 'react';
import { DefaultButton } from '@fluentui/react';

type Props = {};

export const ButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Button</div>
      <div className="description">v8: DefaultButton --&gt; v9: Button</div>
      <div className="controls row">
        <DefaultButton>Standard</DefaultButton>
      </div>
    </div>
  );
};
