class FilePlugin {
  static defaultOptions = {
    content: null,
  };

  constructor(options = {}) {
    this.options = { ...FilePlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FilePlugin.name;

    const { webpack } = compiler;

    const { Compilation } = webpack;

    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (assets) => {
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(this.options.content)
          );
        }
      );
    });
  }
}

module.exports = {
  FilePlugin,
};
