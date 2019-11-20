module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['core', 'auth0', 'package', 'npm', 'circle', 'lint', 'packaging', 'changelog']]
  }
};
