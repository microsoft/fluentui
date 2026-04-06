import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Body1, makeStyles, Spinner, Subtitle2, Text, tokens } from '@fluentui/react-components';

// Distinct colors for each motion slot
const colors = {
  rotation: '#e03e3e',
  tail: '#0078d4',
  leadArc: '#107c10',
  trailArc: '#a333c8',
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
  },
  spinnerCell: {
    flexShrink: 0,
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  label: {
    fontFamily: tokens.fontFamilyMonospace,
  },
});

/**
 * An "exploded view" of the Spinner, progressively building up from static structure to full animation.
 */
export const MotionExploded = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* --- Static structure --- */}
      <div className={styles.section}>
        <Subtitle2>Static structure</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinnerTail={{ style: { opacity: 0 } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              Ring track
            </Text>
            <Body1>
              The spinner element uses a radial-gradient mask to punch out a ring shape. The background color shows the
              track; the foreground color (used by the arcs) is drawn on top.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinnerTail={{ style: { maskImage: 'none' } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              Arc segments (unmasked)
            </Text>
            <Body1>
              Inside the tail container are two identical 135° arc segments drawn with conic-gradient. Here the tail's
              mask is removed so you can see their full extent. At rest (0° rotation) they overlap completely.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              Tail mask applied
            </Text>
            <Body1>
              The tail container applies a conic-gradient mask that hides the first 105°. Since each arc spans 0–135°,
              only the 105–135° sliver peeks through — giving the 30° minimum arc at rest.
            </Body1>
          </div>
        </div>
      </div>

      {/* --- Individual motions --- */}
      <div className={styles.section}>
        <Subtitle2>Individual motions</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{ style: { color: colors.rotation } }}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.rotation }}>
              rotationMotion
            </Text>
            <Body1>
              Continuous 360° rotation of the entire spinner element. Spins the ring, tail mask, and arcs together as
              one unit.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{ style: { color: colors.tail } }}
              rotationMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.tail }}>
              tailMotion
            </Text>
            <Body1>
              Sweeps the tail container (and its 105° mask) from -135° to 225°. This repositions where the arc segments
              are visible through the mask window.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{ style: { color: colors.leadArc } }}
              rotationMotion={null}
              tailMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.leadArc }}>
              leadArcMotion
            </Text>
            <Body1>
              Rotates the first 135° arc segment from 0° → 105° → 0°. As it rotates, more of the segment extends past
              the tail mask edge, growing the visible arc. Then it rotates back, shrinking it.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{ style: { color: colors.trailArc } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.trailArc }}>
              trailArcMotion
            </Text>
            <Body1>
              Rotates the second 135° arc segment from 0° → 225° → 0°. Works with leadArc to pulse the visible arc
              between 30° (both at rest) and 255° (both fully extended).
            </Body1>
          </div>
        </div>
      </div>

      {/* --- Composition --- */}
      <div className={styles.section}>
        <Subtitle2>All combined</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner size="extra-large" />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              Result
            </Text>
            <Body1>
              All four motions working together: rotation spins the ring, the tail sweeps the mask window, and the two
              arc segments expand and collapse to create the pulsing tail effect.
            </Body1>
          </div>
        </div>
      </div>
    </div>
  );
};

MotionExploded.parameters = {
  docs: {
    description: {
      story:
        'A progressive "exploded view" of the Spinner. First the static structure is revealed layer by layer — ' +
        'ring track, arc segments, and tail mask — then each motion slot is shown in isolation with color coding. ' +
        'The final view shows the default Spinner with all four motions working together.',
    },
  },
};
