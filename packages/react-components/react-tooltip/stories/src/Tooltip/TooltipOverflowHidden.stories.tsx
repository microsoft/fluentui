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
