export default {
  errorOnDeprecated: false,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/configs/jest.tsx'],
  moduleNameMapper: {
    '.(svg)$': '<rootDir>/src/__mocks__/svgrMock.tsx',
    '^Assets(.*)$': '<rootDir>/src/assets$1',
    '^Atoms(.*)$': '<rootDir>/src/atoms$1',
    '^Constants(.*)$': '<rootDir>/src/constants$1',
    '^Configs(.*)$': '<rootDir>/src/configs$1',
    '^Hooks(.*)$': '<rootDir>/src/hooks$1',
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
    '^Types(.*)$': '<rootDir>/src/types$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/esm',
  ],
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
