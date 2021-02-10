import * as React from 'react';
import { TextField, ITextFieldProps } from '@fluentui/react/lib/TextField';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Icon, IIconStyles } from '@fluentui/react/lib/Icon';
import { Callout } from '@fluentui/react/lib/Callout';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { IRenderFunction, memoizeFunction } from '@fluentui/react/lib/Utilities';
import { getTheme, FontWeights, ITheme } from '@fluentui/react/lib/Styling';
import { useBoolean, useId } from '@fluentui/react-hooks';

export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 20 } };
const iconButtonStyles: Partial<IButtonStyles> = { root: { marginBottom: -3 } };
const iconStyles: Partial<IIconStyles> = { root: { marginBottom: -3 } };
const iconProps = { iconName: 'Info' };

const getDescriptionStyles = memoizeFunction((theme: ITheme) => ({
  root: { color: theme.palette.green, fontWeight: FontWeights.bold },
}));

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
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <span>{defaultRender(props)}</span>
        <Icon iconName="Globe" title="Globe" ariaLabel="Globe" styles={iconStyles} />
      </Stack>
    </>
  );
};

const CustomLabel = (props: ITextFieldProps): JSX.Element => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const descriptionId: string = useId('description');
  const iconButtonId: string = useId('iconButton');

  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <span id={props.id}>{props.label}</span>
        <IconButton
          id={iconButtonId}
          iconProps={iconProps}
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
            <span id={descriptionId}>The custom label includes an IconButton that displays this Callout on click.</span>
            <DefaultButton onClick={toggleIsCalloutVisible}>Close</DefaultButton>
          </Stack>
        </Callout>
      )}
    </>
  );
};

export const TextFieldCustomRenderExample: React.FunctionComponent = () => {
  const labelId: string = useId('label');
  const onRenderLabel = (props: ITextFieldProps) => <CustomLabel id={labelId} {...props} />;

  return (
    <Stack tokens={stackTokens}>
      <TextField
        aria-labelledby={labelId}
        label="Custom label rendering"
        // eslint-disable-next-line react/jsx-no-bind
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
