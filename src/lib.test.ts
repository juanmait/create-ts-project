import { getGreet } from './lib';

describe('getGreet', () => {
    it('should greet', () => {
        expect(getGreet('Juan')).toBe('Hello Juan!');
    });
});
