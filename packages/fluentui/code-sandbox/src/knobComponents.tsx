import { CodeSnippet, KnobComponents } from '@fluentui/docs-components';
import { Button, Checkbox, Label, Segment, Text } from '@fluentui/react-northstar';
import * as React from 'react';

export const knobComponents: Partial<KnobComponents> = {
  KnobBoolean: props => (
    <Checkbox
      checked={props.value}
      title="Toggle"
      onChange={(e, data) => {
        props.setValue(data.checked);
      }}
    />
  ),
  LogInspector: props => (
    <Segment styles={{ padding: 0 }}>
      <div style={{ display: 'flex', padding: 5 }}>
        <div style={{ flexGrow: 1 }}>
          <Text weight="semibold">Event log</Text>
          <Label circular color="brand" styles={{ marginLeft: '5px' }}>
            {props.items.length}
          </Label>
        </div>
        <Button onClick={props.clearLog} size="small">
          Clear
        </Button>
      </div>
      {props.items.length > 0 && (
        <CodeSnippet fitted formattable={false} label={false} value={props.items.join('\n')} />
      )}
    </Segment>
  ),
};
