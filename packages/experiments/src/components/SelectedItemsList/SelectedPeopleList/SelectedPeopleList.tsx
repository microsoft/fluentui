/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { SelectedPersona } from './Items/SelectedPersona';
import {
  BaseSelectedItem,
  IControlledSelectedItemListProps,
  IUncontrolledSelectedItemListProps,
  IControlledSelectedItemsList,
  IUncontrolledSelectedItemsList
} from '../SelectedItemsList.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ControlledSelectedItemsList } from '../ControlledSelectedItemsList';
import { UncontrolledSelectedItemsList } from '../UncontrolledSelectedItemsList';
import { MaybeControlled } from '../MaybeControlled';

type PartiallyOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, keyof T>;
type PartiallyOptionalWithoutOnRenderItem<T extends { onRenderItem: any }> = PartiallyOptional<T, 'onRenderItem'>;

export interface IControlledSelectedPeopleListProps<TPersona>
  extends PartiallyOptionalWithoutOnRenderItem<IControlledSelectedItemListProps<TPersona>> {}
export interface IUncontrolledSelectedPeopleListProps<TPersona>
  extends PartiallyOptionalWithoutOnRenderItem<IUncontrolledSelectedItemListProps<TPersona>> {}
export interface IControlledSelectedPeopleList extends IControlledSelectedItemsList {}
export interface IUncontrolledSelectedPeopleList<TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>
  extends IUncontrolledSelectedItemsList<TPersona> {}

export const ControlledSelectedPeopleList = <TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>(
  props: IControlledSelectedPeopleListProps<TPersona>
) => <ControlledSelectedItemsList<TPersona> onRenderItem={SelectedPersona} {...props} />;

export const UncontrolledSelectedPeopleList = <TPersona extends IPersonaProps & BaseSelectedItem = IPersonaProps>(
  props: IUncontrolledSelectedPeopleListProps<TPersona>
) => <UncontrolledSelectedItemsList<TPersona> onRenderItem={SelectedPersona} {...props} />;

export type ISelectedPeopleListProps<T> = MaybeControlled<IControlledSelectedPeopleListProps<T>, IUncontrolledSelectedPeopleListProps<T>>;

/**
 * Will render either a controlled or uncontrolled selected items depending on the props that are passed in.
 */
export const SelectedPeopleList = React.memo(<TItem extends BaseSelectedItem & IPersonaProps>(props: ISelectedPeopleListProps<TItem>) => {
  if (props.isControlled) {
    return <ControlledSelectedPeopleList<TItem> {...props} />;
  } else {
    return <UncontrolledSelectedPeopleList<TItem> {...props} />;
  }
  // Cast back to a generic function type, since typescript <3.4 collapses generics on higher-order functions
  // This was solved by https://github.com/microsoft/TypeScript/pull/30215 in typescript@3.4,
}) as <TItem extends BaseSelectedItem & IPersonaProps>(props: ISelectedPeopleListProps<TItem>) => React.ReactElement;
export type SelectedPeopleList<TItem extends BaseSelectedItem & IPersonaProps> = (
  props: ISelectedPeopleListProps<TItem>
) => React.ReactElement;
