import { getGreetingsFor } from './lib';

describe('getGreetingsFor', () => {
    it('should give the expected greeting', () => {
        expect(getGreetingsFor('Juan')).toBe('Hola Juan!');
    });
});
