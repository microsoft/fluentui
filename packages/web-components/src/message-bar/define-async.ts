import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './message-bar.definition-async.js';
import { MessageBar } from './message-bar.js';

RenderableFASTElement(MessageBar).defineAsync(definition);
