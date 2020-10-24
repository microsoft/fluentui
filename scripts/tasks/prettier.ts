import { runPrettierForFolder } from '../prettier/prettier-helpers';

export function prettier() {
  runPrettierForFolder(process.cwd(), true);
}
