import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

// tslint:disable-next-line: interface-name
export interface ExtendedProps extends IPersonaProps {
  internalProp?: boolean;
}

// IPersonaProps

export const TypedProp: IPersonaProps = { placeholder: 'dummy prop' };
