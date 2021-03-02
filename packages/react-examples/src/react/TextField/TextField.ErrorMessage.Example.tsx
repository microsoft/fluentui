import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useBoolean } from '@fluentui/react-hooks';
import { Icon, IIconStyles } from '@fluentui/react/lib/Icon';
import { Text } from '@fluentui/react/lib/Text';

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 350,
};

const richErrorIconStyles: Partial<IIconStyles> = { root: { color: 'red' } };
const richErrorStackStyles: Partial<IStackStyles> = { root: { height: 24 } };
const richErrorStackTokens: IStackTokens = { childrenGap: 8 };

const getErrorMessage = (value: string): string => {
  return value.length < 3 ? '' : `Input value length must be less than 3. Actual length is ${value.length}.`;
};

const getErrorMessagePromise = (value: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(getErrorMessage(value)), 5000);
  });
};

const getRichErrorMessage = (value: string) => {
  return value.length < 3 ? (
    ''
  ) : (
    <Stack styles={richErrorStackStyles} verticalAlign="center" horizontal tokens={richErrorStackTokens}>
      <Icon iconName="Error" styles={richErrorIconStyles} />
      <Text variant="smallPlus">Input value length must be less than 3. Actual length is {value.length}.</Text>
    </Stack>
  );
};

export const TextFieldErrorMessageExample: React.FunctionComponent = () => {
  const [showFields, { toggle: toggleShowFields }] = useBoolean(false);

  return (
    <Stack tokens={stackTokens}>
      <Toggle label="Show text fields" inlineLabel checked={showFields} onChange={toggleShowFields} />
      {showFields && (
        <>
          <strong>Hint: the input length must be less than 3.</strong>
          <TextField label="String-based validation" onGetErrorMessage={getErrorMessage} />
          <TextField label="Promise-based validation" onGetErrorMessage={getErrorMessagePromise} />
          <TextField
            label="String-based validation on render"
            defaultValue="Shows an error message on render"
            onGetErrorMessage={getErrorMessage}
          />
          <TextField
            label="String-based validation only on change"
            defaultValue="Validates only on input change, not on render"
            onGetErrorMessage={getErrorMessage}
            validateOnLoad={false}
          />
          <TextField
            label="Promise-based validation"
            defaultValue="Shows an error message 5 seconds after render"
            onGetErrorMessage={getErrorMessagePromise}
          />
          <TextField
            label="Both description and error message"
            defaultValue="Shows description and error message on render"
            description="Field description"
            onGetErrorMessage={getErrorMessage}
          />
          <TextField
            label="Deferred string-based validation"
            placeholder="Validates after user stops typing for 2 seconds"
            onGetErrorMessage={getErrorMessage}
            deferredValidationTime={2000}
          />
          <TextField
            label="Validates only on focus and blur"
            placeholder="Validates only on input focus and blur"
            onGetErrorMessage={getErrorMessage}
            validateOnFocusIn
            validateOnFocusOut
          />
          <TextField
            label="Validates only on blur"
            placeholder="Validates only on input blur"
            onGetErrorMessage={getErrorMessage}
            validateOnFocusOut
          />
          <TextField
            label="Underlined field:"
            defaultValue="This value is too long"
            underlined
            onGetErrorMessage={getErrorMessage}
          />
          <TextField
            label="Uses the errorMessage property to set an error state"
            placeholder="This field always has an error"
            errorMessage="This is a statically set error message"
          />
          <TextField
            label="Custom rich error message"
            defaultValue="This value is too long"
            onGetErrorMessage={getRichErrorMessage}
          />
        </>
      )}
    </Stack>
  );
};
