import * as React from 'react';
import { SelectedItemsList } from '../SelectedItemsList';
import { SelectedPersona } from './Items/SelectedPersona';
import { ISelectedItemsListProps, ISelectedItemsList } from '../SelectedItemsList.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IObjectWithKey } from 'office-ui-fabric-react/lib/utilities/selection/index';

export type ISelectedPeopleListProps<TPersona> = ISelectedItemsListProps<TPersona>;

export type ISelectedPeopleList<TPersona extends IPersonaProps & IObjectWithKey = IPersonaProps> = ISelectedItemsList<
  TPersona
>;
export type SelectedPeopleList<TPersona extends IPersonaProps & IObjectWithKey = IPersonaProps> = SelectedItemsList<
  TPersona
>;
export const SelectedPeopleList = React.forwardRef(
  <TPersona extends IPersonaProps & IObjectWithKey = IPersonaProps>(
    props: ISelectedPeopleListProps<TPersona>,
    ref: React.Ref<ISelectedPeopleList<TPersona>>,
  ) => <SelectedItemsList<TPersona> ref={ref} onRenderItem={SelectedPersona} {...props} />,
);
