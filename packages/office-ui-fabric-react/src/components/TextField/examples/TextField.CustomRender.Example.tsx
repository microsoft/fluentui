import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IStackTokens, Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { getId, IRenderFunction, memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, FontWeights, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 300,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 20 } };
const iconButtonStyles: Partial<IButtonStyles> = { root: { marginBottom: -3 } };
const iconStyles: Partial<IIconStyles> = { root: { marginBottom: -3 } };

const getDescriptionStyles = memoizeFunction((theme: ITheme) => ({
  root: { color: theme.palette.green, fontWeight: FontWeights.bold },
}));

const descriptionId: string = getId('description');
const iconButtonId: string = getId('iconButton');
const labelId: string = getId('label');

const onRenderDescription = (props: ITextFieldProps): JSX.Element => {
  const theme = getTheme();
  return (
    <Text variant="small" styles={getDescriptionStyles(theme)}>
      {props.description}
    </Text>
  );
};

const onWrapDefaultLabelRenderer = (
  props: ITextFieldProps,
  defaultRender: IRenderFunction<ITextFieldProps>,
): JSX.Element => {
  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
        <span>{defaultRender(props)}</span>
        <Icon iconName="Globe" title="Globe" ariaLabel="Globe" styles={iconStyles} />
      </Stack>
    </>
  );
};

export const TextFieldCustomRenderExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const onRenderLabel = (props: ITextFieldProps): JSX.Element => {
    return (
      <>
        <Stack horizontal verticalAlign="center">
          <span id={labelId}>{props.label}</span>
          <IconButton
            id={iconButtonId}
            iconProps={{ iconName: 'Info' }}
            title="Info"
            ariaLabel="Info"
            onClick={toggleIsCalloutVisible}
            styles={iconButtonStyles}
          />
        </Stack>
        {isCalloutVisible && (
          <Callout
            target={'#' + iconButtonId}
            setInitialFocus
            onDismiss={toggleIsCalloutVisible}
            ariaDescribedBy={descriptionId}
            role="alertdialog"
          >
            <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
              <span id={descriptionId}>
                The custom label includes an IconButton that displays this Callout on click.
              </span>
              <DefaultButton onClick={toggleIsCalloutVisible}>Close</DefaultButton>
            </Stack>
          </Callout>
        )}
      </>
    );
  };
  return (
    <Stack tokens={stackTokens}>
      <TextField
        aria-labelledby={labelId}
        label="Custom label rendering"
        onRenderLabel={onRenderLabel}
        description="Click the (i) icon!"
      />

      <TextField label="Wrapping default label renderer" onRenderLabel={onWrapDefaultLabelRenderer} />

      <TextField
        label="Custom description rendering"
        description="A colorful description!"
        onRenderDescription={onRenderDescription}
      />
    </Stack>
  );
};
