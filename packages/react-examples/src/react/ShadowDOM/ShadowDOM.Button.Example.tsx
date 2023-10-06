import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ButtonDefaultExample } from '../Button/Button.Default.Example';
import { ButtonActionExample } from '../Button/Button.Action.Example';
import { ButtonAnchorExample } from '../Button/Button.Anchor.Example';
import { ButtonCommandExample } from '../Button/Button.Command.Example';
import { ButtonCommandBarExample } from '../Button/Button.CommandBar.Example';
import { ButtonCompoundExample } from '../Button/Button.Compound.Example';
import { ButtonContextualMenuExample } from '../Button/Button.ContextualMenu.Example';
import { ButtonSplitCustomExample } from '../Button/Button.CustomSplit.Example';
import { ButtonIconExample } from '../Button/Button.Icon.Example';
import { ButtonToggleExample } from '../Button/Button.Toggle.Example';
import { Checkbox } from '@fluentui/react';

export const ShadowDOMButtonExample: React.FunctionComponent = () => {
  const [disabled, setDisabled] = React.useState(false);

  const onChange = () => {
    setDisabled(!disabled);
  };

  return (
    <Shadow>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Checkbox label="Disabled?" checked={disabled} onChange={onChange} />
      <ButtonDefaultExample disabled={disabled} />
      <ButtonActionExample disabled={disabled} />
      <ButtonAnchorExample disabled={disabled} />
      <ButtonCommandExample disabled={disabled} />
      <ButtonCommandBarExample disabled={disabled} />
      <ButtonCompoundExample disabled={disabled} />
      <ButtonContextualMenuExample disabled={disabled} />
      <ButtonSplitCustomExample disabled={disabled} />
      <ButtonIconExample disabled={disabled} />
      <ButtonToggleExample disabled={disabled} />
    </Shadow>
  );
};
