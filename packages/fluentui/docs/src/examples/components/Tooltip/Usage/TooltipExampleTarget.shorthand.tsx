import * as React from 'react';
import { Button, Divider, Grid, Ref, Text, Tooltip } from '@fluentui/react-northstar';
import { QnaIcon } from '@fluentui/react-icons-northstar';

const TooltipExampleTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement>(null);

  return (
    <Grid columns="auto 1fr">
      {/* CUSTOM DOM ELEMENT is used as target for Tooltip */}
      <Tooltip
        target={target}
        trigger={<Button icon={<QnaIcon />} circular styles={{ cursor: 'pointer' }} />}
        content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
        position="below"
      />
      <div style={{ marginLeft: 10 }}>
        <Text>Could you guess what does this text means? :)</Text>
        <Divider />
        <Ref innerRef={setTarget}>
          <Text>
            "To the lascivious looking-glass I, that love's majesty to strut before a want love's majesto, to the souls
            of York."
          </Text>
        </Ref>
      </div>
    </Grid>
  );
};

export default TooltipExampleTarget;
