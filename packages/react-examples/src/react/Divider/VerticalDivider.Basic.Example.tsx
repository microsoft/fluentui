import * as React from 'react';
import { VerticalDivider } from '@fluentui/react/lib/Divider';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';

interface IBasicDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getExampleClassNames = memoizeFunction((): IBasicDividerExampleClassNames => {
  const exampleHeight = 40;
  const theme = getTheme();
  return mergeStyleSets({
    wrapper: {
      height: 40,
      backgroundColor: theme.semanticColors.bodyStandoutBackground,
      color: theme.semanticColors.bodyText,
      padding: '0 10px',
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

export const VerticalDividerBasicExample = () => {
  const classNames = getExampleClassNames();

  return (
    <div className={classNames.wrapper}>
      <p className={classNames.text}>Some text before the divider. </p>
      <VerticalDivider />
      <p className={classNames.text}>Some text after the divider. </p>
    </div>
  );
};
