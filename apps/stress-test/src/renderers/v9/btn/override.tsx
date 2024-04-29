import * as React from 'react';
import { Button, ButtonProps, makeStyles, mergeClasses } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/types';
import { useRootStyles, useRootDisabledStyles } from './styles';

const useButtonOverridesStyles = makeStyles({
  base: {
    fontWeight: 'initial',
    minWidth: 'initial',
    fontSize: 'unset',
    lineHeight: 'normal',
  },
});

const ButtonOverride: React.FC<ButtonProps> = props => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const buttonOverrideStyles = useButtonOverridesStyles();

  const { className, disabled, disabledFocusable } = props;
  const applyDisabledStyles = disabled || disabledFocusable;

  return (
    <Button
      {...props}
      className={mergeClasses(
        className,
        rootStyles.base,
        rootStyles.highContrast,
        buttonOverrideStyles.base,
        applyDisabledStyles && rootDisabledStyles.base,
        applyDisabledStyles && rootDisabledStyles.highContrast,
      )}
    />
  );
};

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <ButtonOverride>{`${node.value.name}, ${index}`}</ButtonOverride>;
};

export default componentRenderer;
