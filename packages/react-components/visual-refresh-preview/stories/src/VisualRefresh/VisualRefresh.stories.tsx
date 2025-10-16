import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Input, Label, Select, Switch, makeStyles, useId } from '@fluentui/react-components';
import type { ButtonProps, InputProps, SwitchOnChangeData } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import {
  sanitizeTokenName,
  TEAMS_VISUAL_REFRESH_THEME,
  TEAMS_VISUAL_REFRESH_TOKENS,
  VisualRefreshContext,
} from '@fluentui/visual-refresh-preview';
import { mergeClasses, shorthands } from '@griffel/react';
import { getVisualRefreshAppearanceStateTokens } from '../../../../react-button/library/src/components/Button/useButtonStyles.styles';

type ComponentState = 'rest' | 'hover' | 'focus' | 'disabled';

const buttonStateOrder: ComponentState[] = ['rest', 'hover', 'focus', 'disabled'];
const buttonStateLabels: Record<ComponentState, string> = {
  rest: 'Rest',
  hover: 'Hover',
  focus: 'Focus',
  disabled: 'Disabled',
};

const useStoryStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: 'max-content',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  select: {
    width: '200px',
  },
  controlItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  table: {
    borderCollapse: 'collapse',
    minWidth: '720px',
  },
  headerCell: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightRegular,
    opacity: '0.8',
    padding: '0.75rem',
    textAlign: 'left',
  },
  componentCell: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
    padding: '0.75rem',
    verticalAlign: 'top',
    width: '160px',
  },
  variantCell: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '0.75rem',
    verticalAlign: 'top',
    width: '180px',
  },
  stateCell: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '0.75rem',
    textAlign: 'center',
    width: '140px',
  },
  stateContent: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const useButtonStateStyles = makeStyles({
  focus: {
    ...shorthands.borderColor(tokens.colorStrokeFocus2),
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset`,
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    outlineOffset: '2px',
  },
});

const useInputStateStyles = makeStyles({
  base: {
    width: '200px',
    pointerEvents: 'none',
  },
  hoverOutline: {
    borderColor: tokens.colorNeutralStroke1Hover,
    borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    cursor: 'text',
  },
  hoverUnderline: {
    borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    cursor: 'text',
  },
  focusOutline: {
    borderColor: tokens.colorNeutralStroke1Pressed,
    borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    cursor: 'text',
    '::after': {
      borderBottomColor: tokens.colorCompoundBrandStroke,
      transform: 'scaleX(1)',
    },
  },
  focusUnderline: {
    borderBottomColor: tokens.colorCompoundBrandStroke,
    cursor: 'text',
    '::after': {
      borderBottomColor: tokens.colorCompoundBrandStroke,
      transform: 'scaleX(1)',
    },
  },
});

const VisualRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const customProperties: Record<string, string> = {};
  for (const [key, value] of Object.entries(TEAMS_VISUAL_REFRESH_TOKENS ?? {})) {
    customProperties[`--visual-refresh-${key}`] = value;
  }
  for (const [key, value] of Object.entries(TEAMS_VISUAL_REFRESH_THEME)) {
    customProperties[`--${sanitizeTokenName(key)}`] = String(value);
  }
  return (
    <VisualRefreshContext.Provider value={true}>
      <div style={customProperties as React.CSSProperties}>{children}</div>
    </VisualRefreshContext.Provider>
  );
};

const ButtonStateCell = ({
  appearance,
  state,
  children,
  size,
  isVisualRefreshEnabled,
}: {
  appearance?: ButtonProps['appearance'];
  state: ComponentState;
  children: React.ReactNode;
  size: ButtonProps['size'];
  isVisualRefreshEnabled: boolean;
}) => {
  const buttonStateClasses = useButtonStateStyles();
  const focusClass = state === 'focus' ? buttonStateClasses.focus : undefined;
  const visualRefreshStyle = React.useMemo(() => {
    if (!isVisualRefreshEnabled) {
      return undefined;
    }
    const tokens = getVisualRefreshAppearanceStateTokens(appearance ?? 'secondary');
    const stateKey = state === 'hover' ? 'hover' : state === 'disabled' ? 'disabled' : 'rest';
    const style: React.CSSProperties = {
      color: tokens.foreground[stateKey],
      backgroundColor: tokens.background[stateKey],
      borderColor: tokens.border[stateKey],
    };
    if (state === 'hover') {
      style.cursor = 'pointer';
    }
    return style;
  }, [appearance, isVisualRefreshEnabled, state]);

  return (
    <Button
      appearance={appearance}
      disabled={state === 'disabled'}
      className={focusClass}
      size={size}
      style={visualRefreshStyle}
      tabIndex={-1}
    >
      {children}
    </Button>
  );
};

const InputStateCell = ({
  appearance,
  state,
  defaultValue,
  disabledValue,
  size,
}: {
  appearance: NonNullable<InputProps['appearance']>;
  state: ComponentState;
  defaultValue: string;
  disabledValue: string;
  size: NonNullable<InputProps['size']>;
}) => {
  const inputStateClasses = useInputStateStyles();
  const hoverClass =
    state === 'hover'
      ? appearance === 'underline'
        ? inputStateClasses.hoverUnderline
        : inputStateClasses.hoverOutline
      : undefined;
  const focusClass =
    state === 'focus'
      ? appearance === 'underline'
        ? inputStateClasses.focusUnderline
        : inputStateClasses.focusOutline
      : undefined;
  const className = mergeClasses(inputStateClasses.base, hoverClass, focusClass);

  return (
    <Input
      appearance={appearance}
      className={className}
      defaultValue={state === 'disabled' ? disabledValue : defaultValue}
      disabled={state === 'disabled'}
      size={size}
      readOnly={state !== 'disabled'}
    />
  );
};

const ComponentStatesTable = ({
  controlSize,
  isVisualRefreshEnabled,
}: {
  controlSize: ButtonProps['size'];
  isVisualRefreshEnabled: boolean;
}) => {
  const styles = useStoryStyles();

  const buttonVariants: Array<{ label: string; appearance?: ButtonProps['appearance']; content: string }> = [
    { label: 'Outline', appearance: 'outline', content: 'Outline' },
    { label: 'Primary', appearance: 'primary', content: 'Primary' },
    { label: 'Secondary', appearance: 'secondary', content: 'Secondary' },
    { label: 'Subtle', appearance: 'subtle', content: 'Subtle' },
    { label: 'Transparent', appearance: 'transparent', content: 'Transparent' },
    { label: 'Tint', appearance: 'secondary', content: 'Tint' },
  ];

  const inputVariants: Array<{
    label: string;
    appearance: NonNullable<InputProps['appearance']>;
    defaultValue: string;
    disabledValue: string;
  }> = [
    { label: 'Outline', appearance: 'outline', defaultValue: 'Outline input', disabledValue: 'Outline disabled' },
    {
      label: 'Underline',
      appearance: 'underline',
      defaultValue: 'Underline input',
      disabledValue: 'Underline disabled',
    },
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.headerCell}>Component</th>
          <th className={styles.headerCell}>Variant</th>
          {buttonStateOrder.map(state => (
            <th key={state} className={styles.headerCell}>
              {buttonStateLabels[state]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <React.Fragment>
          {buttonVariants.map((variant, index) => (
            <tr key={`button-${variant.label}`}>
              {index === 0 && (
                <td className={styles.componentCell} rowSpan={buttonVariants.length}>
                  Button
                </td>
              )}
              <td className={styles.variantCell}>{variant.label}</td>
              {buttonStateOrder.map(state => (
                <td key={state} className={styles.stateCell}>
                  <div className={styles.stateContent}>
                    <ButtonStateCell
                      appearance={variant.appearance}
                      state={state}
                      size={controlSize}
                      isVisualRefreshEnabled={isVisualRefreshEnabled}
                    >
                      {state === 'disabled' ? 'Disabled' : variant.content}
                    </ButtonStateCell>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </React.Fragment>
        <React.Fragment>
          {inputVariants.map((variant, index) => (
            <tr key={`input-${variant.label}`}>
              {index === 0 && (
                <td className={styles.componentCell} rowSpan={inputVariants.length}>
                  Input
                </td>
              )}
              <td className={styles.variantCell}>{variant.label}</td>
              {buttonStateOrder.map(state => (
                <td key={state} className={styles.stateCell}>
                  <div className={styles.stateContent}>
                    <InputStateCell
                      appearance={variant.appearance}
                      state={state}
                      defaultValue={variant.defaultValue}
                      disabledValue={variant.disabledValue}
                      size={controlSize}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </React.Fragment>
      </tbody>
    </table>
  );
};

export const VisualRefresh = (): JSXElement => {
  const styles = useStoryStyles();
  const switchId = useId('visual-refresh-toggle');
  const sizeSelectId = useId('visual-refresh-size');
  const [isVisualRefreshEnabled, setIsVisualRefreshEnabled] = React.useState(false);
  const [controlSize, setControlSize] = React.useState<ButtonProps['size']>('medium');

  const handleThemeChange = (_event: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
    setIsVisualRefreshEnabled(Boolean(data.checked));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setControlSize(event.target.value as ButtonProps['size']);
  };

  const content = (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlItem}>
          <Switch
            id={switchId}
            checked={isVisualRefreshEnabled}
            onChange={handleThemeChange}
            label="Visual refresh theme"
          />
        </div>
        <div className={styles.controlItem}>
          <Label htmlFor={sizeSelectId}>Control size</Label>
          <Select id={sizeSelectId} value={controlSize} onChange={handleSizeChange} className={styles.select}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </div>
      </div>
      <ComponentStatesTable controlSize={controlSize} isVisualRefreshEnabled={isVisualRefreshEnabled} />
    </div>
  );

  return isVisualRefreshEnabled ? <VisualRefreshProvider>{content}</VisualRefreshProvider> : content;
};

VisualRefresh.parameters = {
  docs: {
    description: {
      story: 'Compare Button and Input variants across interaction states with and without the visual refresh theme.',
    },
  },
};
