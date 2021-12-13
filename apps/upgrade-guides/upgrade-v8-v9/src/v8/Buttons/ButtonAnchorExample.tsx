import { DefaultButton } from '@fluentui/react';
import React from 'react';

type Props = {};

export const ButtonAnchorExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">(Anchor) Button</div>
      <div className="description">v8: DefaultButton --&gt; v9: Button</div>
      <div className="controls row">
        <DefaultButton href="http://bing.com" target="_blank" title="let us bing!">
          Bing
        </DefaultButton>
      </div>
    </div>
  );
};
