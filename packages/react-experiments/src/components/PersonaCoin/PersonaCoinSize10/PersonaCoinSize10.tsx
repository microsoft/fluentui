import * as React from 'react';
import { Icon } from '@fluentui/react';
import type { ISlotProp } from '@fluentui/foundation-legacy';
import type { JSXElement } from '@fluentui/utilities';

export interface IPersonaCoinSizeProps {}

export type IPersonaCoinSize10Slot = ISlotProp<IPersonaCoinSizeProps>;

const styles = { root: { fontSize: 10 } };

const PersonaCoinSize10 = (): JSXElement => {
  return <Icon iconName="Contact" styles={styles} />;
};

export default PersonaCoinSize10;
