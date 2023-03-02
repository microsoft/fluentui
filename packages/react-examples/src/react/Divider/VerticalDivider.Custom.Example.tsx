import * as React from 'react';
import { VerticalDivider } from '@fluentui/react/lib/Divider';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';

interface ICustomDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getExampleClassNames = memoizeFunction((): ICustomDividerExampleClassNames => {
  const exampleHeight = 40;
  const theme = getTheme();
  return mergeStyleSets({
    wrapper: {
      height: 40,
      backgroundColor: theme.semanticColors.bodyStandoutBackground,
      color: theme.semanticColors.bodyText,
      padding: '0',
    },
    text: {
      display: 'inline-block',
      padding: '0 8px',
      height: exampleHeight,
      lineHeight: exampleHeight,
      verticalAlign: 'top',
      margin: 'auto',
    },
  });
});

const VerticalDividerStyles = {
  wrapper: {
    height: 40,
    backgroundColor: '#F4F4F4',
    padding: 0,
  },
  divider: {
    height: 28,
    backgroundColor: 'pink',
  },
};

export const VerticalDividerCustomExample = () => {
  const exampleClassNames = getExampleClassNames();

  return (
    <div className={exampleClassNames.wrapper}>
      <p className={exampleClassNames.text}> Some text before the divider. </p>
      <VerticalDivider styles={VerticalDividerStyles} />
      <p className={exampleClassNames.text}>Some text after the divider. </p>
    </div>
  );
};
