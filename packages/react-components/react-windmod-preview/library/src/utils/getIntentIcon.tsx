import * as React from 'react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismissFilled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { InfoFilled } from '@fluentui/react-icons/headless/svg/info';
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning';

/** The status intents whose default glyph is shared across components. */
export type GlyphIntent = 'info' | 'success' | 'warning' | 'error';

const intentIcons: Record<GlyphIntent, React.ReactElement> = {
  info: <InfoFilled />,
  success: <CheckmarkCircleFilled />,
  warning: <WarningFilled />,
  error: <DiamondDismissFilled />,
};

/**
 * The default glyph for a status intent, shared by MessageBar and ToastTitle. The elements are
 * unadorned — colour and glyph size belong to the consuming slot's own class, which is why the two
 * components paint the same four glyphs differently. An absent intent has no glyph.
 */
export const getIntentIcon = (intent: GlyphIntent | undefined): React.ReactElement | undefined =>
  intent ? intentIcons[intent] : undefined;
