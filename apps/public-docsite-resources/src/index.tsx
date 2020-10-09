import { createDemoApp } from '@uifabric/example-app-base';
import { configureEnvironment } from '@uifabric/tsx-editor';
import { AppDefinition } from './AppDefinition';
import { GettingStartedPage } from './GettingStartedPage';

// Configure example editor
configureEnvironment({ baseUrl: '.', useMinified: false });

createDemoApp(AppDefinition, GettingStartedPage);
