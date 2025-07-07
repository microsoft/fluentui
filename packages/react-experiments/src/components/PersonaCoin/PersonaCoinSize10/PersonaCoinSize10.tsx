import * as React from 'react';
import { Icon } from '@fluentui/react';
import type { ISlotProp } from '@fluentui/foundation-legacy';

export interface IPersonaCoinSizeProps {}

export type IPersonaCoinSize10Slot = ISlotProp<IPersonaCoinSizeProps>;

const styles = { root: { fontSize: 10 } };

// eslint-disable-next-line @typescript-eslint/no-deprecated
const PersonaCoinSize10 = (): JSX.Element => {
  return <Icon iconName="Contact" styles={styles} />;
};

export default PersonaCoinSize10;
