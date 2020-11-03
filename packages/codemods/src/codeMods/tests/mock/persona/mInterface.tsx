// @ts-ignore
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export interface ExtendedProps extends IPersonaProps {
  internalProp?: boolean;
}

// IPersonaProps

export const TypedProp: IPersonaProps = { placeholder: 'dummy prop' };
