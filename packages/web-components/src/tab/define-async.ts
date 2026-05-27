import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './tab.definition-async.js';
import { Tab } from './tab.js';

RenderableFASTElement(Tab).defineAsync(definition);
