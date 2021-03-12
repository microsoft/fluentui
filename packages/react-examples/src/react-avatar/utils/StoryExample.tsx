import * as React from 'react';
import { makeStylesCompat } from '@fluentui/react-make-styles';

const useStoryExampleRoot = makeStylesCompat([
  [
    null,
    theme => ({
      padding: '10px',
      fontFamily: theme.global.type.fontFamilies.base,
      color: theme.alias.color.neutral.neutralForeground1,
      background: theme.alias.color.neutral.neutralBackground1,
    }),
  ],
]);

const useStoryExampleContent = makeStylesCompat([
  [
    null,
    {
      display: 'flex',
      flexWrap: 'wrap',
      '> *': { margin: '4px' },
    },
  ],
]);

export const StoryExample = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div className={useStoryExampleRoot({})}>
    <h2>{title}</h2>
    <div className={useStoryExampleContent({})}>{children}</div>
  </div>
);
