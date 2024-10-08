/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const rootDir = process.cwd();

module.exports = {
  packagerConfig: {
    asar: false,
    executableName: 'Suitcore',
    appCopyright: 'Copyright (C) 2024, Suitcore',
    icon: path.resolve('assets/favicon.ico'),
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Suitcore',
        setupExe: 'Suitcore-Installer.exe', 
        setupIcon: path.resolve('assets/favicon.ico'),  
        noMsi: true,  
        outputDirectory: path.resolve(rootDir, 'out/make/squirrel.windows'),  
        loadingGif: path.resolve('assets/loading.gif'),  // Opcional: GIF de carga para el instalador
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: path.join(rootDir, 'src/main/main.ts'),
            config: path.join(rootDir, 'tools/vite/vite.main.config.ts'),
          },
          {
            entry: path.join(rootDir, 'src/renderer/preload.ts'),
            config: path.join(rootDir, 'tools/vite/vite.preload.config.ts'),
          },
        ],
        renderer: [
          {
            // Name becomes available in main/main.ts in capital case format: 'MAIN_WINDOW_**'
            name: 'main_window',
            config: path.join(rootDir, 'tools/vite/vite.renderer.config.ts'),
          },
        ],
      },
    },
  ],
};
