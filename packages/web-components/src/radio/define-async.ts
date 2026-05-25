import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './radio.definition-async.js';
import { Radio } from './radio.js';

RenderableFASTElement(Radio).defineAsync(definition);
