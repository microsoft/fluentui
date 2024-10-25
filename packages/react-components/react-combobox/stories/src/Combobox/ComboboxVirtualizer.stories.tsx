import * as React from 'react';
import { Combobox, Option, makeStyles, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

export const ComboboxVirtualizer = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');

  //This should include the item height (32px) and account for rowGap (2px)
  const itemHeight = 34;
  const numberOfItems = 10000;

  const [open, setOpen] = React.useState(false);

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemHeight,
    direction: 'vertical',
    // We want at least 10 additional items on each side of visible items for page up/down (+ 1 buffer)
    bufferItems: 11,
    // We need to recalculate index when at least 10 items (+1px) from the bottom or top for page up/down
    bufferSize: itemHeight * 10 + 1,
  });

  const styles = useStyles();

  return (
    <div>
      <div>
        <label htmlFor={`${comboId}`}>Medium</label>
        <Combobox
          id={`${comboId}`}
          placeholder="Select a number"
          positioning={{ autoSize: 'width' }}
          listbox={{ ref: scrollRef, className: styles.listbox }}
          open={open}
          onOpenChange={(e, data) => {
            setOpen(data.open);
          }}
        >
          <Virtualizer
            numItems={numberOfItems}
            virtualizerLength={virtualizerLength}
            bufferItems={bufferItems}
            bufferSize={bufferSize}
            itemSize={itemHeight}
            containerSizeRef={containerSizeRef}
          >
            {index => {
              return (
                <Option
                  className={styles.option}
                  aria-posinset={index}
                  aria-setsize={numberOfItems}
                  key={`item-${index}`}
                >{`Item ${index + 1}`}</Option>
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
