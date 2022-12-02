import { runPrettierForFolder } from '../prettier';

export function prettier() {
  runPrettierForFolder(process.cwd());
}
