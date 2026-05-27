import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './compound-button.definition-async.js';
import { CompoundButton } from './compound-button.js';

RenderableFASTElement(CompoundButton).defineAsync(definition);
