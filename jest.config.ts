import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  // moduleNameMapper: {
  //   '\\.(css|less|scss)$': 'jest-css-modules-transform'
  // },
  setupFilesAfterEnv: ['jest-expect-message'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@thunk$': '<rootDir>/src/services/thunk',
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@store$': '<rootDir>/src/services/store'
  }
};
export default config;
