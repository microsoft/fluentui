import * as React from 'react';
import { Popup, Button, Divider, Text, Grid, Ref } from '@fluentui/react-northstar';
import { QnaIcon } from '@fluentui/react-icons-northstar';

const PopupCustomTargetExample: React.FC = () => {
  const [textRef, setTextRef] = React.useState<HTMLSpanElement | null>(null);

  return (
    <Grid columns="auto 1fr">
      {/* CUSTOM DOM ELEMENT is used as target for Popup */}
      <Popup
        target={textRef}
        trigger={<Button icon={<QnaIcon />} circular styles={{ cursor: 'pointer' }} title="Q&amp;A" />}
        content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
        position="below"
      />

      <div style={{ marginLeft: 10 }}>
        <Text>Could you guess what does this text means? :)</Text>
        <Divider />
        <Ref innerRef={setTextRef}>
          <Text>
            "To the lascivious looking-glass I, that love's majesty to strut before a want love's majesto, to the souls
            of York."
          </Text>
        </Ref>
      </div>
    </Grid>
  );
};

export default PopupCustomTargetExample;
