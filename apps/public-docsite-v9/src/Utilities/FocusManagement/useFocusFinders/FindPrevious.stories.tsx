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
import { Button, useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-components';

import styles from './FindPrevious.module.css';

export const FindPrevious = () => {
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
