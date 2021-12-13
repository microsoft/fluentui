import React from 'react';
import { DefaultButton, IIconProps } from '@fluentui/react';

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

type Props = {};

export const ToggleButtonExample: React.FC<Props> = () => {
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="example">
      <div className="name">Toggle Button</div>
      <div className="description">v8: DefaultButton --&gt; v9: ToggleButton</div>
      <div className="controls row">
        <DefaultButton
          toggle
          checked={muted}
          text={muted ? 'Volume muted' : 'Volume unmuted'}
          iconProps={muted ? volume0Icon : volume3Icon}
          onClick={() => setMuted(!muted)}
          allowDisabledFocus
        />
      </div>
    </div>
  );
};
