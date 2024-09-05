import { AriaLiveAnnouncer } from '@fluentui/react-aria';
import * as React from 'react';

import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';

export const withAriaLive = (Story: () => JSX.Element, context: FluentStoryContext) => {
  if (isDecoratorDisabled(context, 'AriaLive')) {
    return Story();
  }

  return (
    <AriaLiveWrapper>
      <Story />
    </AriaLiveWrapper>
  );
};

const AriaLiveWrapper: React.FC<{ children: React.ReactNode }> = props => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // The AriaLiveAnnouncer appends an element to DOM in an effect
    // Trigger an extra renderer to make sure that doc examples that need to announce on mount can do so
    setMounted(true);
  }, []);

  return <AriaLiveAnnouncer>{mounted && props.children}</AriaLiveAnnouncer>;
};
