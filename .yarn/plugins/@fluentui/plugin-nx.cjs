module.exports = {
  name: '@fluentui/plugin-nx',
  factory: require => {
    const { BaseCommand } = require('@yarnpkg/cli');
    const { Configuration, Project, scriptUtils } = require('@yarnpkg/core');
    const { Option } = require('clipanion');

    class NxCommand extends BaseCommand {
      static paths = [['nx']];

      args = Option.Proxy();

      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        const { project } = await Project.find(configuration, this.context.cwd);

        await project.restoreInstallState();

        return scriptUtils.executePackageAccessibleBinary(
          project.topLevelWorkspace.anchoredLocator,
          'nx',
          this.args,
          {
            cwd: this.context.cwd,
            project,
            stdin: this.context.stdin,
            stdout: this.context.stdout,
            stderr: this.context.stderr,
          },
        );
      }
    }

    return {
      commands: [NxCommand],
    };
  },
};
