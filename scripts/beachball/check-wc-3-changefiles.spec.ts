import * as fs from 'fs';
import * as path from 'path';
import tmp from 'tmp';
import { main } from './check-wc-3-changefiles';
import type { ChangeFile } from './check-wc-3-changefiles';

tmp.setGracefulCleanup();

function setup(changefiles: Array<ChangeFile>) {
  const root = tmp.dirSync({ prefix: 'changefiles', unsafeCleanup: true }).name;
  const changesRoot = path.join(root, 'change');

  fs.mkdirSync(changesRoot);
  changefiles.forEach((change, idx) => {
    const changeFilePath = path.join(changesRoot, `${change.packageName.replace('/', '-')}-${idx}-abc.json`);
    // console.log(`creating: ${changeFilePath}`);

    fs.writeFileSync(changeFilePath, JSON.stringify(change, null, 2), 'utf-8');
  });

  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);

  return { root: changesRoot, consoleErrorSpy, processExitSpy };
}

describe(`Name of the group`, () => {
  it(`should pass if only valid changefiles exist`, () => {
    const changeFiles: Array<ChangeFile> = [
      {
        type: 'none',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'none',
        packageName: '@fluentui/react-text',
      },
      {
        type: 'prerelease',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'patch',
        packageName: '@fluentui/web-components',
      },
    ];
    const { root, consoleErrorSpy, processExitSpy } = setup(changeFiles);
    main(root);

    expect(processExitSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it(`should pass if changes folder does not exist`, () => {
    const { root, consoleErrorSpy, processExitSpy } = setup([]);
    main(path.join(root, 'invalid'));

    expect(processExitSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it(`should pass if changes folder is empty`, () => {
    const { root, consoleErrorSpy, processExitSpy } = setup([]);
    main(root);

    expect(processExitSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it(`should fail if there is invalid changefile`, () => {
    const changeFiles: Array<ChangeFile> = [
      {
        type: 'patch',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'patch',
        packageName: '@fluentui/react-card',
      },
      {
        type: 'none',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'patch',
        packageName: '@fluentui/react-image',
      },
      {
        type: 'patch',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'none',
        packageName: '@fluentui/react-text',
      },
      {
        type: 'prerelease',
        comment: 'change one',
        email: 'foo@bar.com',
        dependentChangeType: 'patch',
        packageName: '@fluentui/web-components',
      },
    ];
    const { root, consoleErrorSpy, processExitSpy } = setup(changeFiles);
    main(root);

    expect(processExitSpy).toHaveBeenCalledWith(1);

    expect(consoleErrorSpy).toHaveBeenCalled();
    const logs = consoleErrorSpy.mock.calls.flat();

    expect(logs).toMatchInlineSnapshot(`
      Array [
        "================",
        "You commited changefiles with not allowed type/dependentChangeType!",
        "Changefiles that are not for @fluentui/web-components need to have type and dependentChangeType set to \\"none\\"",
        "Invalid change files:",
        "@fluentui-react-card-0-abc.json
      @fluentui-react-image-1-abc.json
      @fluentui-react-text-2-abc.json",
        "================",
      ]
    `);
  });
});
