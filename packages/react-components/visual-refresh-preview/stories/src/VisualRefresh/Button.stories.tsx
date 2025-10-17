import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Label, Select, Switch, makeStyles, useId } from '@fluentui/react-components';
import type { ButtonProps, SwitchOnChangeData } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import {
  sanitizeTokenName,
  TEAMS_VISUAL_REFRESH_THEME,
  TEAMS_VISUAL_REFRESH_TOKENS,
  VisualRefreshContext,
} from '@fluentui/visual-refresh-preview';
import {
  getVisualRefreshAppearanceStateTokens,
  type VisualRefreshAppearanceStateTokens,
} from '../../../../react-button/library/src/components/Button/useButtonStyles.styles';
import { bundleIcon, ChatEmptyFilled, ChatEmptyRegular } from '@fluentui/react-icons';

type ComponentState = 'rest' | 'hover' | 'pressed' | 'focus' | 'disabled';
type AppearanceStateKey = keyof VisualRefreshAppearanceStateTokens['foreground'];

const buttonStateOrder: ComponentState[] = ['rest', 'hover', 'pressed', 'focus', 'disabled'];
const buttonStateLabels: Record<ComponentState, string> = {
  rest: 'Rest',
  hover: 'Hover',
  pressed: 'Pressed',
  focus: 'Focus',
  disabled: 'Disabled',
};
const componentStateToAppearanceStateKey: Record<ComponentState, AppearanceStateKey> = {
  rest: 'rest',
  hover: 'hover',
  pressed: 'pressed',
  focus: 'rest',
  disabled: 'disabled',
};

const useStoryStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: 'max-content',
    backgroundColor: 'white',
    padding: '24px',
    margin: '-48px -24px',
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
    justifyContent: 'start',
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
  const visualRefreshState = React.useMemo(() => {
    if (!isVisualRefreshEnabled) {
      return {
        style: undefined,
        iconVariant: undefined,
        iconColor: undefined,
      };
    }
    const tokens = getVisualRefreshAppearanceStateTokens(appearance ?? 'secondary');
    const stateKey = componentStateToAppearanceStateKey[state];
    const style: React.CSSProperties = {
      color: tokens.foreground[stateKey],
      backgroundColor: tokens.background[stateKey],
      borderColor: tokens.border[stateKey],
    };
    if (state === 'hover') {
      style.cursor = 'pointer';
    }
    return {
      style,
      iconVariant: tokens.icon.variant[stateKey],
      iconColor: tokens.icon.color[stateKey],
    };
  }, [appearance, isVisualRefreshEnabled, state]);

  const visualRefreshStyle = visualRefreshState.style;
  const visualRefreshIconVariant = visualRefreshState.iconVariant;
  const visualRefreshIconColor = visualRefreshState.iconColor;

  const ChatEmpty = bundleIcon(ChatEmptyFilled, ChatEmptyRegular);
  const chatIconFilled = isVisualRefreshEnabled ? visualRefreshIconVariant === 'filled' : undefined;
  const chatIconStyle =
    isVisualRefreshEnabled && visualRefreshIconColor ? { color: visualRefreshIconColor } : undefined;

  return (
    <Button
      appearance={appearance}
      disabled={state === 'disabled'}
      size={size}
      style={visualRefreshStyle}
      tabIndex={-1}
      icon={<ChatEmpty filled={chatIconFilled} style={chatIconStyle} />}
    >
      {children}
    </Button>
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
      </tbody>
    </table>
  );
};

export const ButtonVisualRefresh = (): JSXElement => {
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

ButtonVisualRefresh.parameters = {
  docs: {
    description: {
      story: 'Compare Button variants across interaction states with and without the visual refresh theme.',
    },
  },
};
