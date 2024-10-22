module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['simple-import-sort', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    'sort-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^.+\\.s?css$'],
          [
            `^(${require('module').builtinModules.join('|')})(/|$)`,
            '^react',
            '^@?\\w',
          ],
          ['^components(/.*|$)'],
          ['^lib(/.*|$)', '^hooks(/.*|$)'],
          ['^\\.'],
        ],
      },
    ],
    // Allow unused variables starting with exactly one underscore.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
        "warn",
        {
        "argsIgnorePattern": "^_[^_].*$|^_$",
        "varsIgnorePattern": "^_[^_].*$|^_$",
        "caughtErrorsIgnorePattern": "^_[^_].*$|^_$"
        }
    ]
  },
};