import { preset, task, series } from '@fluentui/scripts';
import { generateJsonTask } from './tasks/generateJsonTask';

preset();

task('generate-json', generateJsonTask);

task('build', series('build:node-lib', 'generate-json')).cached();
