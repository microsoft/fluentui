import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getGlobalClassNames, ITheme } from '@uifabric/styling';
import { css, memoizeFunction, styled } from '@uifabric/utilities';
import { ToggleBase } from './ToggleBase';
import { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';
import * as classes from './Toggle.scss';

const GlobalClassNames = {
  root: 'ms-Toggle',
  label: 'ms-Toggle-label',
  container: 'ms-Toggle-innerContainer',
  pill: 'ms-Toggle-background',
  thumb: 'ms-Toggle-thumb',
  text: 'ms-Toggle-stateText',
};

const getStaticStylesMemoized = memoizeFunction(
  (
    theme: ITheme,
    className?: string,
    checked?: boolean,
    disabled?: boolean,
    inlineLabel?: boolean,
    onOffMissing?: boolean,
  ) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const propControlledClasses = [
      checked && classes.checked,
      disabled && classes.disabled,
      inlineLabel && classes.inlineLabel,
      onOffMissing && classes.onOffMissing,
    ];

    const rootStaticClasses = [checked && 'is-checked', !disabled && 'is-enabled', disabled && 'is-disabled'];

    return {
      root: css(className, classes.root, globalClassNames.root, ...rootStaticClasses, ...propControlledClasses),
      label: css(classes.label, globalClassNames.label, ...propControlledClasses),
      container: css(classes.container, globalClassNames.container, ...propControlledClasses),
      pill: css(classes.pill, globalClassNames.pill, ...propControlledClasses),
      thumb: css(classes.thumb, globalClassNames.thumb, ...propControlledClasses),
      text: css(classes.text, globalClassNames.text, ...propControlledClasses),
    };
  },
);

const getStaticStyles = (props: IToggleStyleProps): Required<IToggleStyles> => {
  const { className, checked, disabled, inlineLabel, onOffMissing, theme } = props;

  return getStaticStylesMemoized(theme!, className, checked, disabled, inlineLabel, onOffMissing);
};

export const Toggle = styled<IToggleProps & React.RefAttributes<HTMLDivElement>, IToggleStyleProps, IToggleStyles>(
  compose<'div', {}, {}, IToggleProps, IToggleProps>(ToggleBase, {
    slots: {
      label: Label,
      stateText: Label,
    },
    displayName: 'Toggle',
  }),
  getStaticStyles,
  undefined,
  { scope: 'Toggle' },
);
