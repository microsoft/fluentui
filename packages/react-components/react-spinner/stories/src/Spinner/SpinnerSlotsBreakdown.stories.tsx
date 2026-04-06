import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Body1, makeStyles, Spinner, Subtitle2, Switch, Text, tokens } from '@fluentui/react-components';

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
  dashedRing: {
    backgroundColor: 'transparent',
    backgroundImage:
      'repeating-conic-gradient(color-mix(in srgb, currentcolor 40%, transparent) 0deg 30deg, transparent 30deg 36deg)',
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
  const variableSpeed:
    | { children: (Motion: React.ElementType, props: Record<string, unknown>) => JSXElement }
    | undefined = halfSpeed ? { children: (Motion, props) => <Motion {...props} duration={3000} /> } : undefined;

  return (
    <div className={styles.container}>
      {/* --- Static structure --- */}
      <div className={styles.section}>
        <Subtitle2>Static structure</Subtitle2>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinner={{ style: { backgroundColor: 'color-mix(in srgb, #107c10 25%, transparent)' } }}
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
              The <code>spinner</code> slot is a span with a radial-gradient mask that punches out a ring shape. Here it
              is styled green to show that the track color is customizable. Its foreground color (
              <code>currentcolor</code>) is inherited by the arc segments inside.
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
              spinnerTail slot — arc segments (unmasked)
            </Text>
            <Body1>
              The <code>spinnerTail</code> slot is positioned inside <code>spinner</code>. It contains two identical
              135° arc segments drawn with conic-gradient. Here the tail's mask is removed so you can see their full
              extent. At rest (0° rotation) they overlap completely. Two arcs are needed because no single arc width can
              achieve both the 30° minimum and 255° maximum visible range.
            </Body1>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.spinnerCell}>
            <Spinner
              size="extra-large"
              spinnerTail={{
                style: {
                  maskImage: 'none',
                  backgroundImage:
                    'conic-gradient(transparent 105deg, color-mix(in srgb, currentcolor 25%, transparent) 105deg)',
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
              spinnerTail slot — mask zone
            </Text>
            <Body1>
              The faded region shows the 255° window that the conic-gradient mask reveals (105°–360°). The remaining
              105° is hidden. Only the arc portions inside the faded window will be visible once the mask is applied.
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
              spinnerTail slot — mask applied
            </Text>
            <Body1>
              The mask hides the first 105°. Since each arc spans 0–135°, only the 105–135° sliver peeks through —
              giving the 30° minimum arc at rest.
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
