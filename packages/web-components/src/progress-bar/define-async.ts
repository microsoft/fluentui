import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './progress-bar.definition-async.js';
import { ProgressBar } from './progress-bar.js';

RenderableFASTElement(ProgressBar).defineAsync(definition);
