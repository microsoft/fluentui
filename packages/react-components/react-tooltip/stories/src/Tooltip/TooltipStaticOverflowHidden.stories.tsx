import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, makeStyles, tokens, Tooltip } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    alignItems: 'flex-start',
  },
  description: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
  },
  staticContainer: {
    display: 'flex',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXS,
  },
});

export const StaticOverflowHidden = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p className={styles.description}>
        The button below sits in a tightly-fitted, non-scrolling <code>overflow: hidden</code> container. The tooltip
        should still appear on hover, since nothing is being scrolled out of view.
      </p>
      <div className={styles.staticContainer}>
        <Tooltip content="I should still appear" relationship="label">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </div>
  );
};

StaticOverflowHidden.parameters = {
  docs: {
    description: {
      story:
        'A tooltip trigger placed inside a static, non-scrolling `overflow: hidden` container (e.g. a flex toolbar) should still show its tooltip, since it is not a scroll boundary being escaped.',
    },
  },
};
