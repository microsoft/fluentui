import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { InfoLabel, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <InfoLabel size="small" info="Example small InfoLabel">
        Small label
      </InfoLabel>
      <InfoLabel size="medium" info="Example medium InfoLabel">
        Medium label
      </InfoLabel>
      <InfoLabel size="large" info="Example large InfoLabel">
        Large label
      </InfoLabel>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story:
        "InfoLabel's `size` prop affects the size of the Label and InfoButton. The default size is medium. " +
        "The small size only meets WCAG's minimum target size requirement if it has at least 2px of non-interactive space on all sides.",
    },
  },
};
