import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { TextFieldBasicExample } from './TextField.Basic.Example';
import { SamplesCardHeader } from './SamplesCardHeader';
import { Stack } from '../../../../packages/office-ui-fabric-react/lib/Stack';

export class Samples extends React.Component {
  render() {
    return (
      <Card styles={{ root: { width: '800px', height: 'auto' } }}>
        <h1>Samples</h1>
        <Stack horizontal gap={100}>
          <Stack>
            <SamplesCardHeader label="TEXT" />
            <SamplesCardHeader label="MEMBER FEATURE STORY" />
          </Stack>

          <Stack>
            <SamplesCardHeader label="LINKS" />
            <SamplesCardHeader label="BUTTONS" />
            <SamplesCardHeader label="ACTION BUTTONS" />
          </Stack>

          <Stack>
            <SamplesCardHeader label="TEXT FIELD" />
            {/* <div style={{ display: 'flex', height: '300px' }}> */}
            <TextFieldBasicExample />
            {/* </div> */}
            <SamplesCardHeader label="TEXT FIELD - UNDERLINE" />
            <SamplesCardHeader label="DROPDOWN MENU" />
          </Stack>

          <Stack>
            <SamplesCardHeader label="TOGGLE" />
            <SamplesCardHeader label="CHECKBOX" />
            <SamplesCardHeader label="RADIO BUTTON" />
          </Stack>
        </Stack>
      </Card>
    );
  }
}
