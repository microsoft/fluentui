import { preset, task, option } from '@fluentui/scripts';
import { createInternalFlightConfigTask, createPublicFlightConfigTask } from './scripts/createFlightConfig';

preset();

option('baseCDNUrl', { default: './dist' } as any);

task('create-internal-flight-config', createInternalFlightConfigTask());

task('create-public-flight-config', createPublicFlightConfigTask());
