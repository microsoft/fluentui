import * as React from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-infolabel-preview';

const useStyles = makeStyles({
  container: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <InfoLabel size="small" info="Example small InfoButton">
        Small label
      </InfoLabel>
      <InfoLabel size="medium" info="Example medium InfoButton">
        Medium label
      </InfoLabel>
      <InfoLabel size="large" info="Example large InfoButton">
        Large label
      </InfoLabel>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "InfoLabel's `size` prop affects the size of the Label and InfoButton. The default size is medium.",
    },
  },
};
