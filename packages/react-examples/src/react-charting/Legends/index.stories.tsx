import * as React from 'react';

import { LegendBasicExample } from './Legends.Basic.Example';
import { LegendsOnChangeExample } from './Legends.OnChange.Example';
import { LegendOverflowExample } from './Legends.Overflow.Example';
import { LegendStyledExample } from './Legends.Styled.Example';
import { LegendWrapLinesExample } from './Legends.WrapLines.Example';
import { LegendsControlledExample } from './Legends.Controlled.Example';

export const Basic = () => <LegendBasicExample />;

export const OnChange = () => <LegendsOnChangeExample />;

export const Overflow = () => <LegendOverflowExample />;

export const Styled = () => <LegendStyledExample />;

export const WrapLines = () => <LegendWrapLinesExample />;

export const Controlled = () => <LegendsControlledExample />;

export default {
  title: 'Components/Legends',
};
