import type {Config} from 'jest';

export default {
    rootDir: __dirname,
    transform: {
        '^.+\\.tsx?$': '@swc/jest',
    },
} satisfies Config;