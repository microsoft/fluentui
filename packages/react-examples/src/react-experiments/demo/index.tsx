import { createDemoApp } from '@fluentui/react-docsite-components';
import { AppDefinition } from './AppDefinition';
import { GettingStartedPage } from './GettingStartedPage';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
import { initializeFolderCovers } from '@fluentui/react-experiments';

initializeFileTypeIcons();
initializeFolderCovers();

createDemoApp(AppDefinition, GettingStartedPage);
