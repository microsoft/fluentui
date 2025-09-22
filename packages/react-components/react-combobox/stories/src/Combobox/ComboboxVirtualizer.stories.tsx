/* eslint @typescript-eslint/no-deprecated: 0 */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Option, makeStyles, useId, useMergedRefs, useTimeout } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

// TODO: Migrate virtualizer to fluentui-contrib dependency once released
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  listbox: {
    // maxHeight will be applied only positioning autoSize set.
    maxHeight: '250px',
  },
  option: {
    height: '32px',
  },
});

export const ComboboxVirtualizer = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');

  //This should include the item height (32px) and account for rowGap (2px)
  const itemHeight = 32;
  const rowGap = 2;
  const numberOfItems = 10000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemHeight,
    direction: 'vertical',
    // We want at least 10 additional items on each side of visible items for page up/down (+ 1 buffer)
    bufferItems: 11,
    // We need to recalculate index when at least 10 items (+1px) from the bottom or top for page up/down
    bufferSize: itemHeight * 10 + 1,
  });
  const selectedIndex = React.useRef(0);

  const styles = useStyles();
  const mergedRefs = useMergedRefs(scrollRef);
  // Scroll timer required to post scrollTo on stack post-open state change
  const [setScrollTimer, clearScrollTimer] = useTimeout();

  return (
    <div>
      <div>
        <label htmlFor={`${comboId}`}>Medium</label>
        <Combobox
          id={`${comboId}`}
          placeholder="Select a number"
          positioning={{ autoSize: 'width' }}
          listbox={{ ref: mergedRefs, className: styles.listbox }}
          onOpenChange={(e, data) => {
            clearScrollTimer();
            if (data.open) {
              setScrollTimer(() => {
                mergedRefs.current?.scrollTo({ top: (itemHeight + rowGap) * selectedIndex.current });
              }, 0);
            }
          }}
          onOptionSelect={(e, data) => {
            if (data.optionValue) {
              selectedIndex.current = parseInt(data.optionValue, 10);
            }
          }}
        >
          <Virtualizer
            numItems={numberOfItems}
            virtualizerLength={virtualizerLength}
            bufferItems={bufferItems}
            bufferSize={bufferSize}
            itemSize={itemHeight}
            containerSizeRef={containerSizeRef}
            gap={rowGap}
          >
            {index => {
              return (
                <Option
                  className={styles.option}
                  aria-posinset={index}
                  aria-setsize={numberOfItems}
                  key={`item-${index}`}
                  value={index.toString()}
                >
                  {`Item ${index + 1}`}
                </Option>
              );
            }}
          </Virtualizer>
        </Combobox>
      </div>
    </div>
  );
};

ComboboxVirtualizer.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can use Virtualizer to display a large number of options\n' +
        `To manually control the maxHeight of the listbox, refer to the [positioning autoSize property](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#anchor-to-target)`,
    },
  },
};
