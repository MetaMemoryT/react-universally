import os from 'os';
import HappyPack from 'happypack';
import notifier from 'node-notifier';
import colors from 'colors/safe';
import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
export function happyPackPlugin({ name, loaders }) {
  // eslint-disable-next-line
  const compilerThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders,
  });
}

export function log(options) {
  const title = `${options.title.toUpperCase()}`;

  if (options.notify) {
    notifier.notify({
      title,
      message: options.message,
    });
  }

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(colors.yellow(msg));
      break;
    case 'error':
      console.log(colors.bgRed.white(msg));
      break;
    case 'info':
    default:
      console.log(colors.green(msg));
  }
}

export function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}
