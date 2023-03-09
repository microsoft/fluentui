import * as React from 'react';
import { InfoLabel } from '@fluentui/react-infobutton';
import { makeStyles, tokens } from '@fluentui/react-components';

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
      <InfoLabel size="small" content="Example info">
        Small label
      </InfoLabel>
      <InfoLabel size="medium" content="Example info">
        Medium label
      </InfoLabel>
      <InfoLabel size="large" content="Example info">
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
