import * as React from 'react';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import BannerAlerts from './BannerAlerts';

export default () => (
  <PrototypeSection title="Alerts">
    <ComponentPrototype
      title="Banner Alerts"
      description="The Alert component can be customized (using variables) to show other intents in addition to the predefined ones."
    >
      <BannerAlerts />
    </ComponentPrototype>
  </PrototypeSection>
);
