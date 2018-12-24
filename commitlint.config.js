module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['project-wide', 'core', 'auth0', 'package', 'npm', 'webpack', 'circle', 'lint', 'packaging', 'changelog']]
  }
};
