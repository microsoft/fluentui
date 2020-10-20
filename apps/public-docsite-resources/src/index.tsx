import { createDemoApp } from '@fluentui/react-docsite-components';
import { configureEnvironment } from '@uifabric/tsx-editor';
import { AppDefinition } from './AppDefinition';
import { GettingStartedPage } from './GettingStartedPage';

// Configure example editor
configureEnvironment({ baseUrl: '.', useMinified: false });

createDemoApp(AppDefinition, GettingStartedPage);
