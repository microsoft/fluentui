import { hello } from '../utilities';
import { someMd } from './content.md';

// this will create invalid output
export const ButtonStories = () => console.log(hello, someMd);
