/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { SelectedItemsList } from '../SelectedItemsList';
import { SelectedPersona } from './Items/SelectedPersona';
import {
  ISelectedItemsList,
  BaseSelectedItem,
  IUncontrolledSelectedItemListProps,
  IControlledSelectedItemListProps
} from '../SelectedItemsList.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

type PartiallyOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, keyof T>;
type PartiallyOptionalWithoutOnRenderItem<T extends { onRenderItem: any }> = PartiallyOptional<T, 'onRenderItem'>;

// Typescript does not distribute type aliases over generic unions.
// Give up and re-declare this type. Must be kept manually in sync with ISelectedItemListProps.
//
// TODO file a typescript issue for this?
export type ISelectedPeopleListProps<TPersona> =
  | PartiallyOptionalWithoutOnRenderItem<IUncontrolledSelectedItemListProps<TPersona>>
  | PartiallyOptionalWithoutOnRenderItem<IControlledSelectedItemListProps<TPersona>>;

export type ISelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> = ISelectedItemsList<TPersona>;
export type SelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps> = SelectedItemsList<TPersona>;
export const SelectedPeopleList = <TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>(
  props: ISelectedPeopleListProps<TPersona>
) => <SelectedItemsList<TPersona> {...props} onRenderItem={props.onRenderItem || SelectedPersona} />;
(SelectedPeopleList as any).displayName = 'SelectedPeopleList';
