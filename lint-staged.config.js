module.exports = {
  '{apps,libs,tools}/**/*.{ts,js,json,md,html,css,scss}': [
    'pnpm nx affected --target lint --uncommitted --fix true',
    'pnpm nx affected --target test --uncommitted',
    'pnpm nx format:write --uncommitted --libs-and-apps',
  ],
};
