import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { IdNamespaceDemo } from '../../../library/testing/IdNamespaceDemo';

export const IdNamespace = (): JSXElement => <IdNamespaceDemo />;

IdNamespace.parameters = {
  fullSourceIsRunnable: false,
  playground: { disable: true },
  docs: {
    description: {
      story: [
        'Each panel contains two independent React/Fluent bundles in one document.',
        'Neither application configures a root or provider prefix.',
        'The protected panel alone has distinct build namespaces.',
        'Unmount the embedded app to observe whether the host retains its theme tokens.',
        'Each whole scenario is isolated from Storybook; the two apps within it are not isolated from each other.',
        'Unique React root identifierPrefix values remain the recommended first-line solution for React 18+.',
        'This reproduction requires independently built artifacts; it cannot be exported as a single JSX playground.',
      ].join(' '),
    },
  },
};
