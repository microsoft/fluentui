import * as React from 'react';
import { makeStyles, Label, Switch, useId, typographyStyles } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';
import { TOKEN_ID } from '@fluentui/react-storybook-addon';
import { addons } from '@storybook/preview-api';

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
  },
  label: {
    ...typographyStyles.subtitle2,
  },
});

/**
 * Tokens switch used in the react-components docs header
 */
export const TokenSwitch: React.FC<{ token?: 'semantic' | 'legacy' }> = ({ token }) => {
  const switchId = useId('token-switch');

  const styles = useStyles();

  const [currentToken, setCurrentToken] = React.useState(token);
  const checked = currentToken === 'legacy';

  const setGlobalToken = (newToken: 'semantic' | 'legacy'): void => {
    addons.getChannel().emit('updateGlobals', { globals: { [TOKEN_ID]: newToken } });
  };

  const onChange = React.useCallback<NonNullable<SwitchProps['onChange']>>((_, data) => {
    const newToken = data.checked ? 'legacy' : 'semantic';
    setGlobalToken(newToken);
    setCurrentToken(newToken);
  }, []);

  return (
    <div className={styles.container}>
      <Label className={styles.label} htmlFor={currentToken === 'semantic' ? undefined : switchId}>
        Semantic Tokens
      </Label>
      <Switch checked={checked} id={switchId} onChange={onChange} />
      <Label className={styles.label} htmlFor={currentToken === 'legacy' ? switchId : undefined}>
        Legacy Tokens
      </Label>
    </div>
  );
};
