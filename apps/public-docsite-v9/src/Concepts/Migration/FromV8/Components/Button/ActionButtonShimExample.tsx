import * as React from 'react';
import { ActionButton, IButtonProps, Icon, IIconProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { ActionButtonShim } from '../../../../../shims/ButtonShim';

const addIcon: IIconProps = { iconName: 'Add' };

export const ActionButtonShimExample = (props: IButtonProps) => {
  return (
    <>
      <ActionButton iconProps={addIcon}>Action</ActionButton>
      <FluentProvider theme={webLightTheme}>
        <ActionButtonShim iconProps={addIcon}>Action</ActionButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="transparent" icon={<Icon {...addIcon} />}>
          Action
        </Button>
      </FluentProvider>
    </>
  );
};
