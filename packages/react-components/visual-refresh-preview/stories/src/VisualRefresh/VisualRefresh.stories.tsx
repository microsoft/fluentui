import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Input, Label, Select, makeStyles, useId } from '@fluentui/react-components';
import type { ButtonProps, InputProps } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import {
  sanitizeTokenName,
  TEAMS_VISUAL_REFRESH_THEME,
  TEAMS_VISUAL_REFRESH_TOKENS,
  VisualRefreshContext,
} from '@fluentui/visual-refresh-preview';
import { mergeClasses } from '@griffel/react';

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
  },
  select: {
    width: '200px',
  },
  table: {
    borderCollapse: 'collapse',
    minWidth: '720px',
  },
  headerCell: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightRegular,
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
  base: {},
  hoverSecondary: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    borderColor: tokens.colorNeutralStroke1Hover,
    color: tokens.colorNeutralForeground1Hover,
    cursor: 'pointer',
  },
  hoverPrimary: {
    backgroundColor: tokens.colorBrandBackgroundHover,
    borderColor: 'transparent',
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: 'pointer',
  },
  hoverSubtle: {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderColor: 'transparent',
    color: tokens.colorNeutralForeground2Hover,
    cursor: 'pointer',
  },
  hoverTransparent: {
    backgroundColor: tokens.colorTransparentBackgroundHover,
    borderColor: 'transparent',
    color: tokens.colorNeutralForeground2BrandHover,
    cursor: 'pointer',
  },
  focus: {
    borderColor: tokens.colorStrokeFocus2,
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset`,
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    outlineOffset: '2px',
  },
});

const useInputStateStyles = makeStyles({
  base: {
    width: '200px',
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
  const theme = TEAMS_VISUAL_REFRESH_TOKENS;
  const customProperties: Record<string, string> = {};
  for (const key of Object.keys(theme) as Array<keyof typeof theme>) {
    customProperties[`--visual-refresh-${key}`] = theme[key];
  }
  for (const key of Object.keys(TEAMS_VISUAL_REFRESH_THEME) as Array<keyof typeof theme>) {
    customProperties[`--${sanitizeTokenName(key)}`] = TEAMS_VISUAL_REFRESH_THEME[key];
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
}: {
  appearance?: ButtonProps['appearance'];
  state: ComponentState;
  children: React.ReactNode;
}) => {
  const buttonStateClasses = useButtonStateStyles();
  const hoverClass =
    state === 'hover'
      ? appearance === 'primary'
        ? buttonStateClasses.hoverPrimary
        : appearance === 'subtle'
        ? buttonStateClasses.hoverSubtle
        : appearance === 'transparent'
        ? buttonStateClasses.hoverTransparent
        : buttonStateClasses.hoverSecondary
      : undefined;
  const focusClass = state === 'focus' ? buttonStateClasses.focus : undefined;
  const className = mergeClasses(buttonStateClasses.base, hoverClass, focusClass);

  return (
    <Button appearance={appearance} disabled={state === 'disabled'} className={className} tabIndex={-1}>
      {children}
    </Button>
  );
};

const InputStateCell = ({
  appearance,
  state,
  defaultValue,
  disabledValue,
}: {
  appearance: NonNullable<InputProps['appearance']>;
  state: ComponentState;
  defaultValue: string;
  disabledValue: string;
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
      readOnly={state !== 'disabled'}
    />
  );
};

const ComponentStatesTable = () => {
  const styles = useStoryStyles();

  const buttonVariants: Array<{ label: string; appearance?: ButtonProps['appearance']; content: string }> = [
    { label: 'Secondary', appearance: 'secondary', content: 'Secondary' },
    { label: 'Primary', appearance: 'primary', content: 'Primary' },
    { label: 'Subtle', appearance: 'subtle', content: 'Subtle' },
  ];

  const inputVariants: Array<{
    label: string;
    appearance: NonNullable<InputProps['appearance']>;
    defaultValue: string;
    disabledValue: string;
  }> = [
    { label: 'Outline', appearance: 'outline', defaultValue: 'Outline input', disabledValue: 'Outline disabled' },
    { label: 'Underline', appearance: 'underline', defaultValue: 'Underline input', disabledValue: 'Underline disabled' },
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
                    <ButtonStateCell appearance={variant.appearance} state={state}>
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
  const selectId = useId('visual-refresh-toggle');
  const [isVisualRefreshEnabled, setIsVisualRefreshEnabled] = React.useState<'off' | 'on'>('off');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsVisualRefreshEnabled(event.target.value as 'off' | 'on');
  };

  const content = (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Label htmlFor={selectId}>Visual refresh theme</Label>
        <Select id={selectId} value={isVisualRefreshEnabled} onChange={handleChange} className={styles.select}>
          <option value="off">Off (v9)</option>
          <option value="on">On</option>
        </Select>
      </div>
      <ComponentStatesTable />
    </div>
  );

  return isVisualRefreshEnabled === 'on' ? <VisualRefreshProvider>{content}</VisualRefreshProvider> : content;
};

VisualRefresh.parameters = {
  docs: {
    description: {
      story: 'Compare Button and Input variants across interaction states with and without the visual refresh theme.',
    },
  },
};
