import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export const KeytipsDynamicExample: React.FunctionComponent = () => {
  const [currButton, setCurrButton] = React.useState('Button 1');
  const startSequence = currButton === 'Button 1' ? 'gg1' : 'gg2';
  const onClick = (ev: React.MouseEvent<{}>) => setCurrButton((ev.target as Element).id);

  return (
    <div>
      <p>
        There is another special case where controls on the page will change other controls down the chain in the keytip
        sequence. Take the case below; clicking Button 1 and Button 2 will update the text of Button3. Triggering the
        keytip for Button 1 or Button 2 will then also change the keytip sequence of Button 3, because it can be both a
        child of Button 1 or Button 2. For this to work fully, Button 1 and Button 2 should have `hasDynamicChildren:
        true` in their keytip props
      </p>
      <DefaultButton
        id="Button 1"
        text="Button 1"
        onClick={onClick}
        keytipProps={{
          content: 'GG1',
          keySequences: ['gg1'],
          hasDynamicChildren: true,
        }}
      />
      <DefaultButton
        id="Button 2"
        text="Button 2"
        onClick={onClick}
        keytipProps={{
          content: 'GG2',
          keySequences: ['gg2'],
          hasDynamicChildren: true,
        }}
      />
      <div>
        <DefaultButton
          text={'Button 3, active button is: ' + currButton}
          keytipProps={{ content: 'GG3', keySequences: [startSequence, 'gg3'] }}
        />
      </div>
    </div>
  );
};
