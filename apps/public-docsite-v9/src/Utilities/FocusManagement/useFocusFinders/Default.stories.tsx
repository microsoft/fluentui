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
