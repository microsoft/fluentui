import * as React from 'react';

import { CardConfigureExample } from './Card.Configure.Example';
import { CardHorizontalExample } from './Card.Horizontal.Example';
import { CardVerticalExample } from './Card.Vertical.Example';

export const Configure = () => <CardConfigureExample />;

export const Horizontal = () => <CardHorizontalExample />;

export const Vertical = () => <CardVerticalExample />;

export default {
  title: 'Components/Card',
};
