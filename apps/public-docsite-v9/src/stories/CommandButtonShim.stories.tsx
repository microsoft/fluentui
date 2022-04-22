import * as React from 'react';
import { CommandButton, IButtonProps, Icon, IIconProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider, makeStyles } from '@fluentui/react-components';
import { CommandButtonShim } from '../shims/ButtonShim';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    columnGap: '20px',
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

const addIcon: IIconProps = { iconName: 'Add' };

export const CommandButtonStory = (props: IButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>8.0</h3>
      <h3>CommandButtonShim</h3>
      <h3>9.0</h3>
      <CommandButton iconProps={addIcon}>Command</CommandButton>
      <FluentProvider theme={webLightTheme}>
        <CommandButtonShim iconProps={addIcon}>Command</CommandButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="transparent" icon={<Icon {...addIcon} />}>
          Command
        </Button>
      </FluentProvider>
    </div>
  );
};

CommandButtonStory.storyName = 'CommandButton';
