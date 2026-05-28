import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './image.definition-async.js';
import { Image } from './image.js';

RenderableFASTElement(Image).defineAsync(definition);
