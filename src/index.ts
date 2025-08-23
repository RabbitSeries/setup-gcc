import core from "@actions/core";
import exec from '@actions/exec';

async function run() {
    try {
        const version = core.getInput('version');
        const platform = process.platform;

        core.info(`Detected platform: ${platform}`);

        if (platform === 'linux') {
            core.info(`Installing GCC ${version} on Linux...`);
            await exec.exec('sudo apt-get update');
            await exec.exec(`sudo apt-get install -y gcc-${version} g++-${version}`);
            await exec.exec(`sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-${version} 100`);
            await exec.exec(`sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-${version} 100`);

        } else if (platform === 'darwin') {
            core.info(`Installing GCC on macOS...`);
            await exec.exec('brew update');
            await exec.exec('brew install gcc');

        } else if (platform === 'win32') {
            core.info(`Installing GCC on Windows using MSYS2...`);
            await exec.exec('choco install -y msys2');
            await exec.exec('C:\\tools\\msys64\\usr\\bin\\bash.exe -lc "pacman -Sy --noconfirm"');
            await exec.exec('C:\\tools\\msys64\\usr\\bin\\bash.exe -lc "pacman -S --noconfirm mingw-w64-x86_64-gcc"');

            core.addPath('C:\\tools\\msys64\\mingw64\\bin');
        } else {
            core.setFailed(`Unsupported platform: ${platform}`);
            return;
        }

        core.info('GCC installed successfully');
        await exec.exec('gcc --version');
        await exec.exec('g++ --version');
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

run();
