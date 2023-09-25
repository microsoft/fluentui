import * as React from 'react';
import { SelectedItemsList } from '../SelectedItemsList';
import { SelectedPersona } from './Items/SelectedPersona';
import type { ISelectedItemsListProps, ISelectedItemsList, BaseSelectedItem } from '../SelectedItemsList.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';

export type ISelectedPeopleListProps<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> =
  ISelectedItemsListProps<TPersona>;

export type ISelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> =
  ISelectedItemsList<TPersona>;
export type SelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> =
  SelectedItemsList<TPersona>;
export const SelectedPeopleList = React.forwardRef(
  <TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>(
    props: ISelectedPeopleListProps<TPersona>,
    ref: React.Ref<ISelectedPeopleList<TPersona>>,
  ) => <SelectedItemsList<TPersona> ref={ref} onRenderItem={SelectedPersona} {...props} />,
);
