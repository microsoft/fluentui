import * as React from 'react';

import { PersonaCoinExample } from './PersonaCoin.Example';
import { PersonaCoinSizeAndColorExample } from './PersonaCoinSizeAndColor.Example';

export const Basic = () => <PersonaCoinExample />;

export const SizeAndColor = () => <PersonaCoinSizeAndColorExample />;

export default {
  title: 'Components/PersonaCoin',
};
