import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton, makeStyles, tokens, Portal, typographyStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '8px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: '200px',
  },
  state: {
    fontFamily: tokens.fontFamilyMonospace,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    padding: '4px',
    textAlign: 'center',
  },
  clippingContainer: {
    ...typographyStyles.subtitle2,

    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke1}`,
    padding: '24px 8px',

    overflow: 'hidden',
  },
  portalContent: {
    ...typographyStyles.subtitle1,

    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorBrandStroke2}`,
    padding: '12px 6px',
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();

  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.clippingContainer}>
          <span>Clipping parent container</span>

          {open && mountNode && (
            <Portal mountNode={mountNode}>
              <div className={styles.portalContent}>Portal content</div>
            </Portal>
          )}
        </div>

        <div className={styles.controls}>
          <ToggleButton checked={open} onClick={() => setOpen(!open)}>
            Toggle portal
          </ToggleButton>

          <code className={styles.state}>{JSON.stringify({ open }, null, 2)}</code>
        </div>
      </div>

      <div ref={setMountNode} />
    </>
  );
};
