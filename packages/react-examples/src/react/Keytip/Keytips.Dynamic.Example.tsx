import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const buttonOneKeytipProps = {
  content: 'GG1',
  keySequences: ['gg1'],
  hasDynamicChildren: true,
};

const buttonTwoKeytipProps = {
  content: 'GG2',
  keySequences: ['gg2'],
  hasDynamicChildren: true,
};

export const KeytipsDynamicExample: React.FunctionComponent = () => {
  const [currButton, setCurrButton] = React.useState('Button 1');
  const startSequence = currButton === 'Button 1' ? 'gg1' : 'gg2';
  const onClick = (buttonId: string) => {
    return () => {
      setCurrButton(buttonId);
    };
  };

  const buttonThreeKeytipProps = React.useMemo(
    () => ({
      content: 'GG3',
      keySequences: [startSequence, 'gg3'],
    }),
    [startSequence],
  );

  return (
    <>
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
        onClick={onClick('Button 1')}
        keytipProps={{
          ...buttonOneKeytipProps,
          onExecute: onClick('Button 1'),
        }}
      />
      <DefaultButton
        id="Button 2"
        text="Button 2"
        onClick={onClick('Button 2')}
        keytipProps={{
          ...buttonTwoKeytipProps,
          onExecute: onClick('Button 2'),
        }}
      />
      <div>
        <DefaultButton text={'Button 3, active button is: ' + currButton} keytipProps={buttonThreeKeytipProps} />
      </div>
    </>
  );
};
