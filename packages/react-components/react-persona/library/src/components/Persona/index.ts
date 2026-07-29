export { Persona } from './Persona';
export type { PersonaBaseProps, PersonaProps, PersonaSlots, PersonaBaseState, PersonaState } from './Persona.types';
export { renderPersona_unstable } from './renderPersona';
export { usePersona_unstable, usePersonaBase_unstable } from './usePersona';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { personaClassNames, usePersonaStyles_unstable } from './usePersonaStyles.styles';
