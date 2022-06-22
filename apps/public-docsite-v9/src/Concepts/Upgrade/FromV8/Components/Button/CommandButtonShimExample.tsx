import * as React from 'react';
import { CommandButton, IButtonProps, Icon, IIconProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { CommandButtonShim } from '../../../../../shims/ButtonShim';

const addIcon: IIconProps = { iconName: 'Add' };

export const CommandButtonShimExample = (props: IButtonProps) => {
  return (
    <>
      <CommandButton iconProps={addIcon}>Command</CommandButton>
      <FluentProvider theme={webLightTheme}>
        <CommandButtonShim iconProps={addIcon}>Command</CommandButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="transparent" icon={<Icon {...addIcon} />}>
          Command
        </Button>
      </FluentProvider>
    </>
  );
};
