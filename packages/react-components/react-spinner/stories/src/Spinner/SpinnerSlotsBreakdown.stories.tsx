import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { MotionSlotProps } from '@fluentui/react-motion';
import { Body1, makeStyles, Spinner, Subtitle2, Switch, Text, tokens } from '@fluentui/react-components';

// Distinct colors for each motion slot
const colors = {
  rotation: '#666666',
  tail: '#0078d4',
  leadArc: 'red',
  // trailArc: '#a333c8',
  trailArc: 'green',
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
    width: '48px',
    display: 'flex',
    justifyContent: 'center',
    padding: '4px',
    overflow: 'visible',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  label: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  dashedRing: {
    backgroundColor: 'transparent',
    backgroundImage:
      'repeating-conic-gradient(color-mix(in srgb, currentcolor 40%, transparent) 0deg 30deg, transparent 30deg 36deg)',
  },
  dualColorArcs: {
    '> :first-child': { color: colors.leadArc },
    '> :last-child': { color: colors.trailArc },
  },
  dualColorArcsSeparated: {
    '> :first-child': { color: colors.leadArc },
    '> :last-child': { color: colors.trailArc, transform: 'rotate(120deg)' },
  },
  leadArcOnly: {
    '> :first-child': { color: colors.leadArc },
    '> :last-child': { display: 'none' },
  },
  trailArcOnly: {
    '> :first-child': { display: 'none' },
    '> :last-child': { color: colors.trailArc, transform: 'rotate(120deg)' },
  },
  maskZoneOverlay: {
    position: 'relative',
    overflow: 'visible',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: '-4px',
      borderRadius: '50%',
      // backgroundImage: `conic-gradient(${tokens.colorBrandStroke1} 105deg, transparent 105deg)`,
      backgroundImage: `conic-gradient(red 105deg, transparent 105deg)`,
      opacity: 0.2,
      maskImage:
        'radial-gradient(closest-side, transparent calc(100% - 10px), black calc(100% - 10px) calc(100% - 2px), transparent calc(100% - 2px) 100%)',
    },
  },
});

/**
 * A "slots breakdown" of the Spinner, progressively building up from static structure to full animation.
 */
export const SlotsBreakdown = (): JSXElement => {
  const styles = useStyles();
  const [halfSpeed, setHalfSpeed] = React.useState(true);

  // When halfSpeed is true, override motion duration to 2× (0.5× speed); otherwise use defaults.
  // The children render function is the slot API for passing custom props to the motion component.
  const variableSpeed: MotionSlotProps<{ duration?: number; easing?: string }> | undefined = halfSpeed
    ? {
        children: (Motion, props) => <Motion {...props} duration={3000} />,
      }
    : undefined;

  return (
    <div className={styles.container}>
      {/* --- Static structure --- */}
      <div className={styles.section}>
        <Subtitle2>Static structure</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{}}
              spinnerTail={{ style: { opacity: 0 } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              spinner slot — ring track
            </Text>
            <Body1>
              The <code>spinner</code> slot is a span with a radial-gradient mask that punches out a ring shape. Its
              foreground color (<code>currentcolor</code>) is inherited by the arc segments inside.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinnerTail={{ style: { maskImage: 'none' }, className: styles.leadArcOnly }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              spinnerTail slot — <span style={{ color: colors.leadArc }}>lead arc</span> (unmasked)
            </Text>
            <Body1>
              The <code>spinnerTail</code> slot is positioned inside <code>spinner</code>. It contains two 135° arc
              segments drawn with conic-gradient. This is the first arc, shown unmasked at its rest position (0°). Two
              arcs are needed because no single arc width can achieve both the 30° minimum and 255° maximum visible
              range.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinnerTail={{
                style: { maskImage: 'none' },
                className: styles.trailArcOnly,
              }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              spinnerTail slot — <span style={{ color: colors.trailArc }}>trail arc</span> (unmasked)
            </Text>
            <Body1>
              The second arc, identical in shape (135°) and also at rest (0°). At rest both arcs overlap completely —
              their animations rotate them to different positions to create the expanding/contracting tail effect.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              className={styles.maskZoneOverlay}
              spinnerTail={{
                className: styles.dualColorArcsSeparated,
                style: {
                  maskImage: 'conic-gradient(transparent 105deg, white 105deg)',
                },
              }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              spinnerTail slot — mask applied
            </Text>
            <Body1>
              The mask hides the first 105° (= 135° arc − 30° desired minimum). Here the masked zone is shown
              semi-transparently so you can see what's hidden. The{' '}
              <span style={{ color: colors.leadArc }}>lead arc</span> at 0° has only its 105–135° sliver peeking
              through. The <span style={{ color: colors.trailArc }}>trail arc</span>, shown here rotated to 120°, is
              fully visible.
            </Body1>
          </div>
        </div>
      </div>

      {/* --- Speed toggle for animated sections --- */}
      <div className={styles.section}>
        <Subtitle2>Animations</Subtitle2>
        <Body1>
          All animations use only CSS <code>rotate</code> transforms, which run on the compositor thread and stay
          jank-free even under heavy main-thread load.
        </Body1>
        <Switch
          checked={halfSpeed}
          onChange={(_, data) => setHalfSpeed(data.checked)}
          label={halfSpeed ? '0.5× speed' : '1× speed'}
        />
      </div>

      {/* --- Individual motions --- */}
      <div className={styles.section}>
        <Subtitle2>Individual motions</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`lead-${halfSpeed}`}
              size="extra-large"
              spinner={{ style: { color: colors.leadArc } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={variableSpeed}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.leadArc }}>
              leadArcMotion
            </Text>
            <Body1>
              Wraps the first arc span inside <code>spinnerTail</code>. Rotates the 135° segment from 0° → 105° → 0°. As
              it rotates, more of the segment extends past the tail mask edge, growing the visible arc.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`trail-${halfSpeed}`}
              size="extra-large"
              spinner={{ style: { color: colors.trailArc } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={null}
              trailArcMotion={variableSpeed}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.trailArc }}>
              trailArcMotion
            </Text>
            <Body1>
              Wraps the second arc span inside <code>spinnerTail</code>. Rotates from 0° → 225° → 0°. Together with
              leadArcMotion, the two arcs pulse the visible tail between 30° and 255°.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`tail-${halfSpeed}`}
              size="extra-large"
              spinner={{ style: { color: colors.tail } }}
              rotationMotion={null}
              tailMotion={variableSpeed}
              leadArcMotion={null}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} className={styles.label} style={{ color: colors.tail }}>
              tailMotion
            </Text>
            <Body1>
              Wraps <code>spinnerTail</code>. Sweeps the tail container (and its 105° mask) from -135° to 225°,
              repositioning where the arc segments are visible through the mask window.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`rotation-${halfSpeed}`}
              size="extra-large"
              spinner={{ className: styles.dashedRing, style: { color: colors.rotation } }}
              spinnerTail={{ style: { opacity: 0 } }}
              rotationMotion={variableSpeed}
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
              Wraps <code>spinner</code>. Continuous 360° rotation of the entire spinner element — ring, tail mask, and
              arcs all spin together as one unit. The dashed ring makes the rotation visible in isolation.
            </Body1>
          </div>
        </div>
      </div>

      {/* --- Progressive composition --- */}
      <div className={styles.section}>
        <Subtitle2>Progressive composition</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`comp1-${halfSpeed}`}
              size="extra-large"
              spinner={{ style: { color: colors.leadArc } }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={variableSpeed}
              trailArcMotion={null}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              leadArcMotion only
            </Text>
            <Body1>
              The leading arc segment pulses in and out of the mask. On its own it produces a small flickering arc.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`comp2-${halfSpeed}`}
              size="extra-large"
              spinnerTail={{ className: styles.dualColorArcs }}
              rotationMotion={null}
              tailMotion={null}
              leadArcMotion={variableSpeed}
              trailArcMotion={variableSpeed}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              + trailArcMotion
            </Text>
            <Body1>
              Adding the trailing arc extends the pulse range from 30°–135° to 30°–255°. The arc now breathes wide.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`comp3-${halfSpeed}`}
              size="extra-large"
              spinnerTail={{ className: styles.dualColorArcs }}
              rotationMotion={null}
              tailMotion={variableSpeed}
              leadArcMotion={variableSpeed}
              trailArcMotion={variableSpeed}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              + tailMotion
            </Text>
            <Body1>
              The tail sweep rotates the mask window, giving the pulsing arc a sense of direction and travel.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              key={`comp4-${halfSpeed}`}
              size="extra-large"
              spinner={{ className: styles.dashedRing, style: { color: colors.rotation } }}
              spinnerTail={{ className: styles.dualColorArcs }}
              rotationMotion={variableSpeed}
              tailMotion={variableSpeed}
              leadArcMotion={variableSpeed}
              trailArcMotion={variableSpeed}
            />
          </div>
          <div className={styles.text}>
            <Text size={300} weight="semibold">
              + rotationMotion
            </Text>
            <Body1>
              Finally, the outer rotation spins the entire assembly for continuous circular motion — the complete
              Spinner.
            </Body1>
          </div>
        </div>
      </div>
    </div>
  );
};

SlotsBreakdown.parameters = {
  docs: {
    description: {
      story:
        'A progressive "exploded view" of the Spinner\'s internal architecture. ' +
        'The spinner achieves its expanding/contracting tail effect using only CSS rotation transforms, ' +
        'which run on the compositor thread and stay jank-free even under heavy main-thread load. ' +
        'Two arc segments rotating behind a conic-gradient mask create the illusion of an arc that grows and shrinks — ' +
        'no animated gradients or clip-paths needed.',
    },
  },
};
