import { Button, Flex, Provider, useCSS } from '@fluentui/react-northstar';
import * as React from 'react';

export const StyleOverridesConcatenation: React.FC = () => {
  const classNameFromProps = useCSS({ color: 'red', border: '2px solid red' });
  const className = useCSS(classNameFromProps, { color: 'green' });

  return (
    <span className={className}>
      Overrides will win{' '}
      <span aria-label="A trophy emoji" role="img">
        🏆
      </span>
    </span>
  );
};

export const StyleOverridesPseudo: React.FC = () => {
  const className = useCSS({ ':hover': { textDecoration: 'underline' } });

  return (
    <button className={className}>
      Hover me{' '}
      <span aria-label="A mouse emoji" role="img">
        🖱️
      </span>
    </button>
  );
};

export const StyleOverridesText: React.FC = () => {
  const redClassName = useCSS({ color: 'red' });
  const themedClassName = useCSS(theme => ({ color: theme.siteVariables.colorScheme.brand.foreground1 }));

  return (
    <Flex gap="gap.small">
      <span className={redClassName}>A red text</span>
      <span className={themedClassName}>A themed text</span>
    </Flex>
  );
};

export const StyleOverridesSlots: React.FC = () => {
  const rootClassName = useCSS({ padding: '0.5rem' });
  const contentClassName = useCSS(theme => ({ fontWeight: theme.siteVariables.fontWeightSemilight }));

  return (
    <Flex gap="gap.small">
      <Button content="A regular button" />
      <Button className={rootClassName} content={{ className: contentClassName, content: 'A styled button' }} />
    </Flex>
  );
};

const ButtonWithDirectionDependantOverrides: React.FC = props => {
  const className = useCSS({ borderLeft: '2px solid green', borderRight: '2px solid red' });

  return <Button className={className}>{props.children}</Button>;
};

export const StyleOverridesRTL: React.FC = () => (
  <Flex gap="gap.small">
    <ButtonWithDirectionDependantOverrides>An LTR button</ButtonWithDirectionDependantOverrides>

    <Provider as={React.Fragment} rtl>
      <ButtonWithDirectionDependantOverrides>An RTL button</ButtonWithDirectionDependantOverrides>
    </Provider>
  </Flex>
);
