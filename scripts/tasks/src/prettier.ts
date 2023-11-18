import { runPrettierForFolder } from '@fluentui/scripts-prettier';

export function prettier() {
  runPrettierForFolder(process.cwd());
}
