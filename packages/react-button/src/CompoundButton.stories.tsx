import * as React from 'react';
import { CompoundButton } from './CompoundButton';

export const Default = () => (
  <CompoundButton secondaryContent="This is the secondary content">This is a compound button</CompoundButton>
);

export default {
  title: 'Components/CompoundButton',
  component: CompoundButton,
};
