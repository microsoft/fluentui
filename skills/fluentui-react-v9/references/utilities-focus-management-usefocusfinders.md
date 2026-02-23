# Utilities/Focus Management/useFocusFinders

This hook returns utility functions to find focusable elements, which can be useful when creating
a feature that requires specific focus management.

## Examples

### Default

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import {
  Button,
  useArrowNavigationGroup,
  makeStyles,
  useFocusFinders,
  Body1Stronger,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
  },
  note: {
    display: 'block',
    backgroundColor: tokens.colorBrandStroke1,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '4px',

    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
});

export const Default = () => {
  const styles = useStyles();
  const { findAllFocusable } = useFocusFinders();
  const [count, setCount] = React.useState(0);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  React.useEffect(() => {
    if (toolbarRef.current) {
      setCount(findAllFocusable(toolbarRef.current).length);
    }
  }, [findAllFocusable]);

  return (
    <>
      <div className={styles.note}>
        <Body1Stronger>{count} focusable elements below</Body1Stronger>
      </div>
      <div
        ref={toolbarRef}
        aria-label="Editor toolbar example"
        role="toolbar"
        {...attributes}
        className={styles.container}
      >
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" disabled icon={<CopyRegular />} />
        <Button aria-label="Cut" disabled icon={<CutRegular />} />
        <Button aria-label="Paste" disabled icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Find All Where

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import {
  Button,
  ToggleButton,
  useArrowNavigationGroup,
  makeStyles,
  useFocusFinders,
  Body1Stronger,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
  },
  note: {
    display: 'block',
    backgroundColor: tokens.colorBrandStroke1,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '4px',

    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
});

export const FindAllWhere = () => {
  const styles = useStyles();
  const { findAllFocusable } = useFocusFinders();
  const [count, setCount] = React.useState(0);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  React.useEffect(() => {
    if (toolbarRef.current) {
      setCount(findAllFocusable(toolbarRef.current, el => el.hasAttribute('aria-pressed')).length);
    }
  }, [findAllFocusable]);

  return (
    <>
      <div className={styles.note}>
        <Body1Stronger>{count} toggle buttons below</Body1Stronger>
      </div>
      <div
        ref={toolbarRef}
        aria-label="Editor toolbar example"
        role="toolbar"
        {...attributes}
        className={styles.container}
      >
        <ToggleButton appearance="primary" aria-label="Bold" icon={<TextBoldRegular />} />
        <ToggleButton appearance="primary" aria-label="Underline" icon={<TextUnderlineRegular />} />
        <ToggleButton appearance="primary" aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Find First

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, useFocusFinders, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: '5px',
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const FindFirst = () => {
  const styles = useStyles();
  const { findFirstFocusable } = useFocusFinders();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  const onClick = () => {
    if (toolbarRef.current) {
      findFirstFocusable(toolbarRef.current)?.focus();
    }
  };

  return (
    <>
      <div>
        <Button onClick={onClick}>Focus first</Button>
      </div>
      <div
        ref={toolbarRef}
        aria-label="Editor toolbar example"
        role="toolbar"
        {...attributes}
        className={styles.container}
      >
        <Button disabled aria-label="Bold" icon={<TextBoldRegular />} />
        <Button appearance="primary" aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Find Last

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, useFocusFinders, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: '5px',
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const FindLast = () => {
  const styles = useStyles();
  const { findLastFocusable } = useFocusFinders();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  const onClick = () => {
    if (toolbarRef.current) {
      findLastFocusable(toolbarRef.current)?.focus();
    }
  };

  return (
    <>
      <div>
        <Button onClick={onClick}>Focus last</Button>
      </div>
      <div
        ref={toolbarRef}
        aria-label="Editor toolbar example"
        role="toolbar"
        {...attributes}
        className={styles.container}
      >
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button appearance="primary" aria-label="Cut" icon={<CutRegular />} />
        <Button disabled aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Find Next

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, useFocusFinders, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: '5px',
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const FindNext = () => {
  const styles = useStyles();
  const { findNextFocusable } = useFocusFinders();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    findNextFocusable(e.currentTarget)?.focus();
  };

  return (
    <div
      ref={toolbarRef}
      aria-label="Editor toolbar example"
      role="toolbar"
      {...attributes}
      className={styles.container}
    >
      <Button aria-label="Bold" icon={<TextBoldRegular />} />
      <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
      <Button aria-label="Italic" icon={<TextItalicRegular />} />
      <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
      <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
      <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
      <Button onClick={onClick}>Focus next</Button>
      <Button appearance="primary" aria-label="Copy" icon={<CopyRegular />} />
      <Button aria-label="Cut" icon={<CutRegular />} />
      <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
    </div>
  );
};
```

### Find Previous

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, useFocusFinders, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: '5px',
    display: 'flex',
    gap: '5px',
    padding: '10px',
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const FindPrevious = () => {
  const styles = useStyles();
  const { findPrevFocusable } = useFocusFinders();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    findPrevFocusable(e.currentTarget)?.focus();
  };

  return (
    <div
      ref={toolbarRef}
      aria-label="Editor toolbar example"
      role="toolbar"
      {...attributes}
      className={styles.container}
    >
      <Button aria-label="Bold" icon={<TextBoldRegular />} />
      <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
      <Button aria-label="Italic" icon={<TextItalicRegular />} />
      <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
      <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
      <Button appearance="primary" aria-label="Align Right" icon={<TextAlignRightRegular />} />
      <Button onClick={onClick}>Focus previous</Button>
      <Button aria-label="Copy" icon={<CopyRegular />} />
      <Button aria-label="Cut" icon={<CutRegular />} />
      <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
    </div>
  );
};
```
