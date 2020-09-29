import * as React from 'react';
import { LinkBasicExample } from './Link.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const LinkBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-link/Link/Link.Basic.Example.tsx') as string;

export const LinkPageProps: IDocPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-link/src/components/Link',
  examples: [
    {
      title: 'Link Basic',
      code: LinkBasicExampleCode,
      view: <LinkBasicExample />,
      styles: ({ theme }) => {
        // UHF overrides. :( These are here rather than in the example because they're not necessary
        // under normal circumstances, and including them in the example makes it more confusing.
        return {
          root: {
            selectors: {
              '.ms-Link': {
                color: theme!.palette.themePrimary,
                margin: 0,
                padding: 0,
                overflow: 'inherit',
                textOverflow: 'inherit',
                selectors: {
                  ':active, :hover, :active:hover': {
                    color: theme!.palette.themeDarker,
                  },
                  ':focus': {
                    color: theme!.palette.themePrimary,
                  },
                },
              },
              '.ms-Link.is-disabled': {
                color: theme!.palette.neutralTertiary,
                pointerEvents: 'none',
                cursor: 'default',
              },
            },
          },
        };
      },
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react-link/Link/docs/LinkOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-examples/src/react-link/Link/docs/LinkBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
};
