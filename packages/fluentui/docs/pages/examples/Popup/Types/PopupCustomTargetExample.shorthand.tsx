import * as React from 'react';
import { Popup, Button, Divider, Text, Grid, Ref, Box } from '@fluentui/react-northstar';
import { QnaIcon } from '@fluentui/react-icons-northstar';

const PopupCustomTargetExample: React.FC = () => {
  const [textRef, setTextRef] = React.useState<HTMLSpanElement | null>(null);

  return (
    <Grid
      styles={{
        gridTemplateColumns: 'auto 1fr',
        msGridColumns: 'auto 1fr',
      }}
    >
      {/* CUSTOM DOM ELEMENT is used as target for Popup */}
      <Popup
        target={textRef}
        trigger={
          <Button
            icon={<QnaIcon />}
            circular
            styles={{ cursor: 'pointer', msGridColumn: 1, marginRight: 10 }}
            title="Q&amp;A"
          />
        }
        content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
        position="below"
      />

      <Box styles={{ msGridColumn: 2 }}>
        <div style={{ marginLeft: 10 }}>
          <Text>Could you guess what does this text means? :)</Text>
          <Divider />
          <Ref innerRef={setTextRef}>
            <Text>
              "To the lascivious looking-glass I, that love's majesty to strut before a want love's majesto, to the
              souls of York."
            </Text>
          </Ref>
        </div>
      </Box>
    </Grid>
  );
};

export default PopupCustomTargetExample;
