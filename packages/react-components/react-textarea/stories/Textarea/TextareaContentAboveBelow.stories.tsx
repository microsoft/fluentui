import * as React from 'react';
import {
  Button,
  Label,
  makeStyles,
  Textarea,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  useId,
} from '@fluentui/react-components';
import {
  AttachFilled,
  DrawTextRegular,
  EmojiRegular,
  FontDecrease24Regular,
  FontIncrease24Regular,
  Highlight24Filled,
  SendRegular,
  TextBold24Regular,
  TextFont24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
} from '@fluentui/react-icons';

const useContentBelowStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content) 1fr',
  },
  sendButton: {
    justifySelf: 'flex-end',
  },
});

const ContentBelow = () => {
  const styles = useContentBelowStyles();
  return (
    <div className={styles.root}>
      <Button appearance="transparent" icon={<DrawTextRegular />} />
      <Button appearance="transparent" icon={<EmojiRegular />} />
      <Button appearance="transparent" icon={<AttachFilled />} />
      <Button className={styles.sendButton} appearance="transparent" icon={<SendRegular />} />
    </div>
  );
};

const ContentAbove = () => (
  <Toolbar aria-label="Text formatting">
    <ToolbarButton aria-label="Increase Font Size" icon={<FontIncrease24Regular />} />
    <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
    <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
    <ToolbarDivider />
    <ToolbarButton aria-label="Bold text" icon={<TextBold24Regular />} />
    <ToolbarButton aria-label="Italizise text" icon={<TextItalic24Regular />} />
    <ToolbarButton aria-label="Underline text" icon={<TextUnderline24Regular />} />
    <ToolbarDivider />
    <ToolbarButton aria-label="Highlight text" icon={<Highlight24Filled />} />
  </Toolbar>
);

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

export const ContentAboveBelow = () => {
  const textareaId = useId();
  const styles = useStyles();
  return (
    <>
      <Label htmlFor={textareaId}>Content above/below Textarea.</Label>
      <Textarea
        id={textareaId}
        className={styles.root}
        contentAbove={<ContentAbove />}
        contentBelow={<ContentBelow />}
        placeholder="Type text here..."
      />
    </>
  );
};

ContentAboveBelow.parameters = {
  docs: {
    description: {
      story:
        `A textarea can have elements above or below the entered text. These elements are displayed inside the` +
        `textarea border.`,
    },
  },
};

ContentAboveBelow.storyName = 'Content above/below';
