import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './toggle-button.definition-async.js';
import { ToggleButton } from './toggle-button.js';

RenderableFASTElement(ToggleButton).defineAsync(definition);
