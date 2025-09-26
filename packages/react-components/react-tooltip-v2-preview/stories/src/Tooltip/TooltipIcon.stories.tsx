import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InfoLabel, Link } from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components';

export const Icon = (props: Partial<InfoLabelProps>): JSXElement => {
  return (
    <InfoLabel
      info={
        <>
          This is example information for an InfoLabel. <Link href="https://react.fluentui.dev">Learn more</Link>
        </>
      }
      {...props}
    >
      This is an icon with an InfoLabel to show extra information
    </InfoLabel>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story: `When tooltips are attached to icons, they should use the InfoLabel control to be accessible. Tooltips should not be attached directly to static elements like icons, and nor should static elements be given a tabindex.`,
    },
  },
};
