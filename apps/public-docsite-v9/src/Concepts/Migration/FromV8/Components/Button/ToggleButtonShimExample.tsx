/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { DefaultButton, IButtonProps, Icon, IIconProps, initializeIcons } from '@fluentui/react';
import { webLightTheme, FluentProvider, ToggleButton } from '@fluentui/react-components';
import { ToggleButtonShim } from '../../../../../shims/ButtonShim';

initializeIcons();

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

export const ToggleButtonShimExample = (props: IButtonProps) => {
  const [muted1, setMuted1] = React.useState(false);
  const [muted2, setMuted2] = React.useState(false);
  const [muted3, setMuted3] = React.useState(false);

  return (
    <>
      <DefaultButton
        toggle
        checked={muted1}
        text="Toggle"
        iconProps={muted1 ? volume0Icon : volume3Icon}
        onClick={() => setMuted1(!muted1)}
      />
      <FluentProvider theme={webLightTheme}>
        <ToggleButtonShim
          toggle
          checked={muted2}
          text="Toggle"
          iconProps={muted2 ? volume0Icon : volume3Icon}
          onClick={() => setMuted2(!muted2)}
        />
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <ToggleButton
          checked={muted3}
          icon={muted3 ? <Icon {...volume0Icon} /> : <Icon {...volume3Icon} />}
          onClick={() => setMuted3(!muted3)}
        >
          Toggle
        </ToggleButton>
      </FluentProvider>
    </>
  );
};
