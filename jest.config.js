
module.exports = {
    preset: 'ts-jest',
    roots: ['client/src/Components'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tests/tsconfig.json',
            },
        ],
    }
}