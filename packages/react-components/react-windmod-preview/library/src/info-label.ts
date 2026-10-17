export { InfoLabel, infoLabelClassNames, useInfoLabelStyles } from './components/InfoLabel';
export type { InfoLabelProps, InfoLabelSlots, InfoLabelState } from './components/InfoLabel';

export { InfoButton, infoButtonClassNames, useInfoButtonStyles } from './components/InfoButton';
export type { InfoButtonProps, InfoButtonSize, InfoButtonSlots, InfoButtonState } from './components/InfoButton';

/** Headless building blocks, re-exported for consumers composing their own InfoLabel. */
export {
  renderInfoButton,
  renderInfoLabel,
  useInfoButton,
  useInfoLabel,
} from '@fluentui/react-headless-components-preview/info-label';
