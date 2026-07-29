export type {
  PersonaBaseProps,
  PersonaProps,
  PersonaSlots,
  PersonaBaseState,
  PersonaState,
} from './components/Persona/index';
export {
  Persona,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  personaClassNames,
  renderPersona_unstable,
  usePersonaStyles_unstable,
  usePersona_unstable,
  usePersonaBase_unstable,
} from './components/Persona/index';
