module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    //{
    //  name: '@electron-forge/maker-dmg',
    //  platforms: ['darwin']
    //}
  ]
};
