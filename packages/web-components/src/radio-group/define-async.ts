import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './radio-group.definition-async.js';
import { RadioGroup } from './radio-group.js';

RenderableFASTElement(RadioGroup).defineAsync(definition);
