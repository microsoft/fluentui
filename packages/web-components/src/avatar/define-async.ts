import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './avatar.definition-async.js';
import { Avatar } from './avatar.js';

RenderableFASTElement(Avatar).defineAsync(definition);
