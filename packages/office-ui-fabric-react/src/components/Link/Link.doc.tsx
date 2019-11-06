import * as React from 'react';
import { LinkBasicExample } from './examples/Link.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const LinkBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Link/examples/Link.Basic.Example.tsx') as string;

export const LinkPageProps: IDocPageProps = {
  title: 'Link',
  componentName: 'Link',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Link',
  examples: [
    {
      title: 'Link',
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
                    color: theme!.palette.themeDarker
                  },
                  ':focus': {
                    color: theme!.palette.themePrimary
                  }
                }
              },
              '.ms-Link.is-disabled': {
                color: theme!.palette.neutralTertiary,
                pointerEvents: 'none',
                cursor: 'default'
              }
            }
          }
        };
      }
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Link/docs/LinkDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button']
};
