import { Button, Flex, useCSS } from '@fluentui/react-northstar';
import * as React from 'react';

export function StyleOverridesConcatenation() {
  const classNameFromProps = useCSS({ color: 'red', border: '2px solid red' });
  const className = useCSS(classNameFromProps, { color: 'green' });

  return <span className={className}>Overrides will win 🏆</span>;
}

export function StyleOverridesPseudo() {
  const className = useCSS({ ':hover': { textDecoration: 'underline' } });

  return <button className={className}>Hover me 🖱️</button>;
}

export function StyleOverridesText() {
  const redClassName = useCSS({ color: 'red' });
  const themedClassName = useCSS(theme => ({ color: theme.siteVariables.colorScheme.brand.foreground1 }));

  return (
    <Flex gap="gap.small">
      <span className={redClassName}>A red text</span>
      <span className={themedClassName}>A themed text</span>
    </Flex>
  );
}

export function StyleOverridesSlots() {
  const rootClassName = useCSS({ padding: '0.5rem' });
  const contentClassName = useCSS(theme => ({ fontWeight: theme.siteVariables.fontWeightSemilight }));

  return (
    <Flex gap="gap.small">
      <Button content="A regular button" />
      <Button className={rootClassName} content={{ className: contentClassName, content: 'A styled button' }} />
    </Flex>
  );
}
