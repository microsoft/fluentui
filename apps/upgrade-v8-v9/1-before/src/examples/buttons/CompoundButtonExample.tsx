import { CompoundButton } from '@fluentui/react';
import React from 'react';

type Props = {};

export const CompoundButtonExample: React.FC<Props> = () => {
  return (
    <>
      <div className="example">
        <div className="name">Compound Button</div>
        <div className="description">v8: CompoundButton --&gt; v9: CompoundButton</div>
        <div className="controls row">
          <CompoundButton secondaryText="Secondary text">CompoundButton</CompoundButton>
        </div>
      </div>
    </>
  );
};
