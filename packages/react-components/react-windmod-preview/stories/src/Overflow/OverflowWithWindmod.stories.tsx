/*
 * WHY THERE IS NO WINDMOD `Overflow` COMPONENT
 * ============================================
 *
 * Overflow is deliberately SCOPED OUT of the windmod port. It is not missing, not deferred, and
 * not blocked — there is nothing to port.
 *
 * `Overflow` is renderless: it renders no element of its own. It clones its single child, wires a
 * ResizeObserver + the `@fluentui/priority-overflow` engine to it, and stamps `data-*` attributes
 * on the items the engine decides are out of view (`data-overflowing`, `data-overflow-item`,
 * `data-overflow-menu`, `data-overflow-divider`, `data-overflow-group`). A windmod port re-skins a
 * headless component; a component with no skin has nothing to re-skin.
 *
 * The whole Griffel `Overflow` family ships TWO CSS declarations in total:
 *
 *   [data-overflowing]   { display: none;   }
 *   [data-overflow-menu] { flex-shrink: 0;  }
 *
 * (For scale: windmod Button reproduces 105.) Those two are token-free, theme-free and say
 * nothing about how the items themselves look — so they are equally correct over Griffel-styled
 * items and over windmod-styled items. Keep consuming `Overflow` from `@fluentui/react-components`
 * exactly as a Griffel app would.
 *
 * See the "Overflow" section of the package README for the same rationale in prose, plus the
 * measurement that backs the compatibility claim.
 */

import * as React from 'react';
// The Griffel suite barrel — the sanctioned consumer entry point (importing
// `@fluentui/react-overflow` directly is blocked by `@fluentui/no-restricted-imports`; see
// docs/architecture/layers.md). `Overflow` carries the two declarations above; `OverflowItem`
// and `useOverflowMenu` are renderless and style-free.
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-components';
// The headless subpath re-exports the very same `OverflowItem` / `useOverflowMenu` objects and
// swaps in an `Overflow` that is Griffel's minus the styles hook — the entire delta between the
// two panels below.
import { Overflow as HeadlessOverflow } from '@fluentui/react-headless-components-preview/overflow';
import { Button, FluentProvider } from '@fluentui/react-windmod-preview';

import styles from './OverflowWithWindmod.module.css';

const items = ['Cut', 'Copy', 'Paste', 'Undo', 'Redo', 'Bold', 'Italic', 'Underline'];

/**
 * Windmod Button standing in as the overflow menu trigger. `Menu` is not part of the windmod
 * package, so this uses the simplest pattern that needs no unshipped component: a count of the
 * items the engine has hidden. `useOverflowMenu` registers the element so the engine reserves
 * room for it before it decides what fits.
 */
const OverflowCount = (): React.ReactNode => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Button ref={ref} appearance="primary" aria-label={`${overflowCount} more items`} data-testid="overflow-count">
      +{overflowCount}
    </Button>
  );
};

const Toolbar = (props: { children: React.ReactNode }): React.ReactNode => (
  <>
    {items.map(label => (
      <OverflowItem key={label} id={label}>
        <Button data-item={label}>{label}</Button>
      </OverflowItem>
    ))}
    {props.children}
  </>
);

/**
 * There is no windmod `Overflow` because `Overflow` is renderless — it stamps `data-*` attributes
 * and renders nothing of its own, so there is no skin to re-implement. Windmod consumers keep
 * importing `Overflow` from `@fluentui/react-components` exactly as a Griffel consumer would; its
 * two CSS declarations are token-free and apply to windmod-styled items unchanged.
 *
 * Drag the width control: windmod Buttons drop out of the strip left to right and the `+N`
 * trigger — itself a windmod Button — counts them. The top panel gets its hiding from Griffel's
 * `Overflow`; the bottom panel uses the Griffel-free headless `Overflow` and supplies the same
 * two declarations from the story's own stylesheet.
 */
export const WithWindmodComponents = (): React.ReactNode => {
  const [width, setWidth] = React.useState(480);

  return (
    <FluentProvider>
      <div className={styles.stack}>
        <label className={styles.control}>
          Container width
          <input
            type="range"
            min={180}
            max={1000}
            step={10}
            value={width}
            data-testid="width"
            onChange={event => setWidth(event.target.valueAsNumber)}
          />
          {width}px
        </label>

        <p className={styles.heading}>Overflow from @fluentui/react-components — no extra CSS required</p>
        <p className={styles.note}>
          Griffel&apos;s <code>Overflow</code> merges its own two declarations into the child&apos;s className. They are
          injected unlayered, so they out-rank windmod Button&apos;s <code>display: inline-flex</code> in the{' '}
          <code>fui.components</code> cascade layer. This is the recommended path.
        </p>
        <Overflow padding={40}>
          <div className={styles.container} style={{ width }} data-testid="griffel-panel">
            <Toolbar>
              <OverflowCount />
            </Toolbar>
          </div>
        </Overflow>

        <p className={styles.heading}>
          @fluentui/react-headless-components-preview/overflow — two consumer rules required
        </p>
        <p className={styles.note}>
          The headless <code>Overflow</code> is Griffel&apos;s minus the styles hook: Griffel-free and smaller, but it
          ships no CSS, so the engine stamps <code>data-overflowing</code> and nothing acts on it. Supply the two rules
          yourself from an unlayered stylesheet — see <code>.headlessHiding</code> in{' '}
          <code>OverflowWithWindmod.module.css</code>.
        </p>
        <HeadlessOverflow padding={40}>
          <div
            className={`${styles.container} ${styles.headlessHiding}`}
            style={{ width }}
            data-testid="headless-panel"
          >
            <Toolbar>
              <OverflowCount />
            </Toolbar>
          </div>
        </HeadlessOverflow>
      </div>
    </FluentProvider>
  );
};
