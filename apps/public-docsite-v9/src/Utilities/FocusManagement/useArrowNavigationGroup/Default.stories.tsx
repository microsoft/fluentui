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
import { Button, useArrowNavigationGroup, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  return (
    <div aria-label="Editor toolbar example" role="toolbar" {...attributes} className={styles.container}>
      <Button aria-label="Bold" icon={<TextBoldRegular />} />
      <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
      <Button aria-label="Italic" icon={<TextItalicRegular />} />
      <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
      <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
      <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
      <Button aria-label="Copy" icon={<CopyRegular />} />
      <Button aria-label="Cut" icon={<CutRegular />} />
      <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
    </div>
  );
};
