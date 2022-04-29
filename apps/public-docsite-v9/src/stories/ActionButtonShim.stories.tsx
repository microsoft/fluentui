import * as React from 'react';
import { ActionButton, IButtonProps, Icon, IIconProps } from '@fluentui/react';
import { Button, webLightTheme, FluentProvider, makeStyles } from '@fluentui/react-components';
import { ActionButtonShim } from '../shims/ButtonShim';

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

export const ActionButtonStory = (props: IButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>8.0</h3>
      <h3>ActionButtonShim</h3>
      <h3>9.0</h3>
      <ActionButton iconProps={addIcon}>Action</ActionButton>
      <FluentProvider theme={webLightTheme}>
        <ActionButtonShim iconProps={addIcon}>Action</ActionButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="transparent" icon={<Icon {...addIcon} />}>
          Action
        </Button>
      </FluentProvider>
    </div>
  );
};

ActionButtonStory.storyName = 'ActionButton';
