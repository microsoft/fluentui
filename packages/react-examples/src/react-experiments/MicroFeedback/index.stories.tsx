import * as React from 'react';

import { MicroFeedbackExample } from './MicroFeedback.Example';
import { MicroFeedbackCalloutExample } from './MicroFeedbackCallout.Example';
import { MicroFeedbackStackExample } from './MicroFeedbackStack.Example';

export const Basic = () => <MicroFeedbackExample />;

export const Callout = () => <MicroFeedbackCalloutExample />;

export const Stack = () => <MicroFeedbackStackExample />;

export default {
  title: 'Components/MicroFeedback',
};
