// eslint-disable-next-line import/no-import-module-exports
import path from 'path';

module.exports = {
  process(src: string, filename: string) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
