/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { SelectedItemsList } from '../SelectedItemsList';
import { SelectedPersona } from './Items/SelectedPersona';
import { ISelectedItemsListProps, ISelectedItemsList, BaseSelectedItem } from '../SelectedItemsList.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

type PartiallyOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, keyof T>;
export type ISelectedPeopleListProps<TPersona> = PartiallyOptional<ISelectedItemsListProps<TPersona>, 'onRenderItem'>;

export type ISelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> = ISelectedItemsList<TPersona>;
export type SelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> = SelectedItemsList<TPersona>;
export const SelectedPeopleList = React.forwardRef(
  <TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>(
    props: ISelectedPeopleListProps<TPersona>,
    ref: React.Ref<ISelectedPeopleList<TPersona>>
  ) => <SelectedItemsList<TPersona> ref={ref} onRenderItem={SelectedPersona} {...props} />
);
