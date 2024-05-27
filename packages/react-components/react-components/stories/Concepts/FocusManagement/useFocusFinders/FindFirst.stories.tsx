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
