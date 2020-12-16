import * as _ from 'lodash';
import { name, internet } from 'faker';

export interface AtMentionItem {
  header: string;
  image: string;
  content: string;
}

export const atMentionItems: AtMentionItem[] = _.times(10, () => ({
  header: `${name.firstName()} ${name.lastName()}`,
  image: internet.avatar(),
  content: name.title(),
}));
