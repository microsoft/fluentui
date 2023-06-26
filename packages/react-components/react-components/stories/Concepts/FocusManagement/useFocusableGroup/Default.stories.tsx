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
import { Button, useFocusableGroup, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('5px'),
    display: 'flex',
    ...shorthands.gap('5px'),
    maxWidth: 'fit-content',
  },
});

export const Default = () => {
  const styles = useStyles();
  const attr = useFocusableGroup();

  return (
    <div tabIndex={0} aria-label="Editor toolbar example" role="toolbar" {...attr} className={styles.container}>
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
