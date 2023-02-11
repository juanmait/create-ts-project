import { getGreet } from './lib.js';

describe('getGreet', () => {
    it('should greet', () => {
        expect(getGreet()).toBe('Hello!');
    });
});
