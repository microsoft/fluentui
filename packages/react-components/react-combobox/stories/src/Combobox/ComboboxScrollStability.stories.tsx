import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

const options = Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`);

/**
 * Demonstrates that the listbox scrollTop is preserved when a parent component updates
 * state in response to hovering an option (e.g. tracking the currently-hovered item).
 *
 * Previously, each state update caused the Combobox to re-render, which recreated the
 * positioning manager and triggered the autoSize middleware to reset the listbox scrollTop
 * to 0, making the last options in a long list unreachable.
 * See: https://github.com/microsoft/fluentui/issues/35731
 */
export const ScrollStability = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-scroll-stability');
  const styles = useStyles();
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

  const onMouseEnter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const value = (e.currentTarget as HTMLElement).dataset.value ?? null;
    setHoveredOption(value);
  }, []);

  return (
    <div className={styles.root}>
      <label id={comboId}>Scroll-stable Combobox (50 options)</label>
      <span>Hovered: {hoveredOption ?? 'none'}</span>
      <Combobox aria-labelledby={comboId} placeholder="Select an option" {...props}>
        {options.map(option => (
          <Option key={option} data-value={option} onMouseEnter={onMouseEnter}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

ScrollStability.parameters = {
  docs: {
    description: {
      story:
        'A Combobox with many options where a parent component tracks the hovered option in state. ' +
        'Scrolling to the bottom of the list and hovering a low option should not cause the listbox ' +
        'to jump back to the top. This validates the fix for https://github.com/microsoft/fluentui/issues/35731.',
    },
  },
};
