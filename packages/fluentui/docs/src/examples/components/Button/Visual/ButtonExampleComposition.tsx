import * as React from 'react';
import { Button, useCSS, ButtonProps } from '@fluentui/react-northstar';

type TertieryButtonProps = ButtonProps & {
  tertiery?: boolean;
};

const useTertieryButtonStyles = (props, ...rest) => {
  const { className, tertiery } = props;

  return useCSS(
    theme => {
      const { siteVariables } = theme;

      return tertiery
        ? {
            color: 'black',
            backgroundColor: siteVariables.colorScheme.default.background2,
          }
        : {};
    },
    ...rest,
    className,
  );
};

const TertieryButton: React.FC<TertieryButtonProps> = props => {
  const { className, ...rest } = props;

  const resolvedClasses = useTertieryButtonStyles(props);

  return <Button className={resolvedClasses} {...rest} />;
};

type TertieryCompactButton = TertieryButtonProps;

const useTertieryCompactButtonStyles = (props, ...rest) => {
  return useTertieryButtonStyles(
    props,
    theme => {
      const { siteVariables } = theme;
      return {
        minWidth: '70px',
        padding: 0,
        // some overrides
        ...(props.tertiery && {
          color: 'white',
          backgroundColor: siteVariables.colorScheme.red.background,
        }),
      };
    },
    ...rest,
  );
};

const TertieryCompactButton: React.FC<TertieryCompactButton> = props => {
  const { className, ...rest } = props;

  const resolvedClasses = useTertieryCompactButtonStyles(props);

  return <TertieryButton className={resolvedClasses} {...rest} />;
};

const ButtonExampleUseCss = () => {
  const className1 = useCSS(({ siteVariables }) => ({ border: `1px solid ${siteVariables.colors.brand[500]}` }), {
    color: 'blue',
  });
  return (
    <>
      <TertieryButton content="Click here" className={className1} />
      <TertieryButton content="Click here" tertiery />
      <TertieryButton content="Click here" primary />
      <TertieryCompactButton content="Click here" tertiery />
      <TertieryCompactButton content="Click here" />
    </>
  );
};

export default ButtonExampleUseCss;
