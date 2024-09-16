# Dev Container

This configuration is based on the base Node container provided by VSCode, it should work out of the box for most users.

> For more information on how to use/create `development containers` follow the [VSCode Documentation](https://code.visualstudio.com/docs/remote/create-dev-container)

> See here for more information on the base container https://github.com/microsoft/vscode-dev-containers/blob/main/containers/javascript-node/.devcontainer/base.Dockerfile

## Cypress tests

To run Cypress in dev containers some additional configuration is required, since Cypress depends on opening a browser (which requires GUI), a `DISPLAY` Environment Variable should be exported by the host to tell docker how to properly run GUI. Follow the instructions bellow to add to host OS the required software.

> ⚠️ You should rebuild the container every time your IP address changes if you want to run Cypress tests

### WSL2

1. Install [VcXsrv](https://sourceforge.net/projects/vcxsrv)
2. Run the XLaunch application, then in it's application menu you'll find a Preferences choice. In the Preferences make this setting:
   - Allow connections from network clients
     > This opens the display so it accepts XServer connections from any non-local computer. The Docker container we're about to create counts - as would a Linux machine in your office.
3. export `DISPLAY` Environment Variable somewhere (e.g `.bashrc`, `.zshrc`)
   ```bash
   # get your IP Address
   IP=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
   export DISPLAY = $IP:0
   ```

### MacOS

1. Install [XQuartz](https://www.xquartz.org/)
2. Run the XQuartz application, then in it's application menu you'll find a Preferences choice. In the Preferences make this setting:
   - Allow connections from network clients.
     > This opens the display so it accepts X11 connections from any non-local computer. The Docker container we're about to create counts - as would a Linux machine in your office.
3. Save `DISPLAY` and `IP` environment variables somewhere (e.g: `.bashrc`, `.zshrc`)
   ```bash
     export IP = $(ipconfig getifaddr en0) # en0 or eth0... might vary depending on your WI-FI/Cable connection
     export DISPLAY = $IP:0
   ```
4. With XQuartz **NOT** running run this once to add IP address:
   ```bash
     xhost +$IP
   ```
