import { IVersionSwitcherDefinition } from '../../utilities/SiteDefinition.types';

export interface ILoadingComponentProps {
  title?: string;
  shimmer?: boolean;
  versionSwitcherDefinition?: IVersionSwitcherDefinition;
}
