import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './anchor-button.definition-async.js';
import { AnchorButton } from './anchor-button.js';

RenderableFASTElement(AnchorButton).defineAsync(definition);
