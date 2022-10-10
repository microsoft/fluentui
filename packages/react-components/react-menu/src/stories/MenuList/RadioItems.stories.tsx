import * as React from 'react';

import { MenuList, MenuItemRadio, makeStyles, tokens } from '@fluentui/react-components';
import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

export const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

export const RadioItems = () => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </div>
  );
};

RadioItems.parameters = {
  docs: {
    description: {
      story: [
        'A variant of `MenuItem` that handles radio like selection. The `name` and `value` props are are used',
        'similar to [HTML checkboxes with `input`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)',
        '',
        '```html',
        '<input type="radio" name="name" value="value" />',
        '```',
      ].join('\n'),
    },
  },
};
