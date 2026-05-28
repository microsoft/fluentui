import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './rating-display.definition-async.js';
import { RatingDisplay } from './rating-display.js';

RenderableFASTElement(RatingDisplay).defineAsync(definition);
