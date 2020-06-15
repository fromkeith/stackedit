// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    "ecmaVersion": 2019,
  },
  env: {
    browser: true,
  },
  extends: [
      'airbnb-base',
      "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    // 'html',
    "vue"
  ],
  globals: {
    "NODE_ENV": false,
    "VERSION": false
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
     'vue/order-in-components': false,
     'vue/max-len': false,
     'max-len': false,
     'vue/no-use-v-if-with-v-for': false,
     'vue/no-unused-components': false,
     'vue/custom-event-name-casing': false,
     'vue/no-side-effects-in-computed-properties': false,
     'implicit-arrow-linebreak': false,
    'import/no-cycle': false,
    'no-param-reassign': [2, { 'props': false }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
