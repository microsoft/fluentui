'use client';

import * as React from 'react';
import type { InfoLabelState } from './InfoLabel.types';

export type InfoButtonOwnership = {
  open: boolean;
  surfaceId: string | undefined;
};

export type InfoLabelOwnershipReporter = (lifetime: object, ownership: InfoButtonOwnership | null) => void;

export const InfoLabelOwnershipContext = React.createContext<InfoLabelOwnershipReporter | undefined>(undefined);

export const infoLabelOwnershipReporter = Symbol('infoLabelOwnershipReporter');

export type InternalInfoLabelState = InfoLabelState & {
  [infoLabelOwnershipReporter]?: InfoLabelOwnershipReporter;
};
