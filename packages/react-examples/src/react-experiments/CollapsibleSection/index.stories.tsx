import * as React from 'react';

import { CollapsibleSectionAccordionExample } from './CollapsibleSection.Accordion.Example';
import { CollapsibleSectionBasicExample } from './CollapsibleSection.Basic.Example';
import { CollapsibleSectionControlledExample } from './CollapsibleSection.Controlled.Example';
import { CollapsibleSectionRecursiveExample } from './CollapsibleSection.Recursive.Example';
import { CollapsibleSectionSlotsExample } from './CollapsibleSection.Slots.Example';
import { CollapsibleSectionStyledExample } from './CollapsibleSection.Styled.Example';

export const Accordion = () => <CollapsibleSectionAccordionExample />;

export const Basic = () => <CollapsibleSectionBasicExample />;

export const Controlled = () => <CollapsibleSectionControlledExample />;

export const Recursive = () => <CollapsibleSectionRecursiveExample />;

export const Slots = () => <CollapsibleSectionSlotsExample />;

export const Styled = () => <CollapsibleSectionStyledExample />;

export default {
  title: 'Components/CollapsibleSection',
};
