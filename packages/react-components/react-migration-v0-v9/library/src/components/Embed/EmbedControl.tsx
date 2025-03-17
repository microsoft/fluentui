import * as React from 'react';
import { Button, mergeClasses } from '@fluentui/react-components';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
import { useEmbedControlStyles } from './EmbedControl.styles';
import type { EmbedControlProps } from './Embed.types';

export const embedControlClassName = "fui-Embed-control";
export const EmbedControl = React.forwardRef<HTMLButtonElement, EmbedControlProps>((props, ref) => {
  const { active = false, className, onClick, ...rest } = props;
  const classes = useEmbedControlStyles();

  return (
    <Button
      ref={ref}
      className={mergeClasses(embedControlClassName, classes.root, classes.focusIndicator, active && classes.active, className)}
      appearance="transparent"
      onClick={onClick}
      icon={active ? <PauseFilled fontSize={24} /> : <PlayFilled fontSize={24} />}
      {...rest}
    >
    </Button>
  );
});

EmbedControl.displayName = 'EmbedControl';
