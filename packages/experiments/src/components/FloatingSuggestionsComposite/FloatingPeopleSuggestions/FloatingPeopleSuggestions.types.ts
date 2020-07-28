import { IBaseFloatingSuggestionsProps } from '../FloatingSuggestions.types';
import { Omit } from '@uifabric/utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export type IFloatingPeopleSuggestionsProps = Omit<IBaseFloatingSuggestionsProps<IPersonaProps>, 'onRenderSuggestion'>;
