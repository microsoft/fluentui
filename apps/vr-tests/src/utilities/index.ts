import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { initializeFolderCovers } from '@uifabric/experiments/lib/FolderCover';

initializeIcons();
initializeFolderCovers();

export interface IStoryConfig {
  rtl?: boolean;
}

export * from './FabricDecorator';
export * from './DevOnlyStoryHeader';
