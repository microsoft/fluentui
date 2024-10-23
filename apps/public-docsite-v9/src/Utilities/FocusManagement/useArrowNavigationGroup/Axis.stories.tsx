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
  Field,
  RadioGroup,
  Radio,
  UseArrowNavigationGroupOptions,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },

  vertical: {
    flexDirection: 'column',
  },

  both: {},
  horizontal: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
  },
  ['grid-linear']: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
  },
});

export const Axis = () => {
  const styles = useStyles();
  const [axis, setAxis] = React.useState<UseArrowNavigationGroupOptions['axis']>('horizontal');
  const atributes = useArrowNavigationGroup({ axis });

  return (
    <>
      <Field label="Select an axis">
        <RadioGroup value={axis} onChange={(e, data) => setAxis(data.value as UseArrowNavigationGroupOptions['axis'])}>
          <Radio label="Horizontal" value="horizontal" />
          <Radio label="Vertical" value="vertical" />
          <Radio label="Both" value="both" />
          <Radio label="Grid" value="grid" />
          <Radio label="Linear Grid" value="grid-linear" />
        </RadioGroup>
      </Field>
      <div
        aria-label="Editor toolbar example"
        role="toolbar"
        {...atributes}
        className={mergeClasses(styles.container, axis && styles[axis])}
      >
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
    </>
  );
};

Axis.parameters = {
  docs: {
    description: {
      story: [
        'Keyboard navigation can be configured for different axis:',
        '- horizontal - navigation with left/right keys',
        '- vertical - navigation with up/downkeys',
        '- both - navigation with all arrow keys, left/down and right/up will navigate in the same direction',
        '- grid - bidirectional navigation in a 2D grid',
        '- grid-linear - same as grid navigation, but horizontal focus will continue to flow to the next row',
      ].join('\n'),
    },
  },
};
