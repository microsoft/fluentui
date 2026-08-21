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
  scrollContainer: {
    height: '120px',
    width: '240px',
    overflow: 'hidden scroll',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    position: 'relative',
  },
  content: {
    height: '300px',
    paddingTop: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
  },
  staticContainer: {
    display: 'flex',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXS,
  },
});

export const OverflowHidden = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p className={styles.description}>
        Scroll the box below. The tooltip should disappear when the button scrolls out of view, not follow it outside
        the container boundary.
      </p>
      <div className={styles.scrollContainer}>
        <div className={styles.content}>
          <Tooltip content="I should hide when scrolled out of view" relationship="label">
            <Button>Hover me, then scroll</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

OverflowHidden.parameters = {
  docs: {
    description: {
      story:
        'When a tooltip trigger scrolls out of an overflow container, the tooltip should hide instead of rendering outside the clipped boundary.',
    },
  },
};

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
