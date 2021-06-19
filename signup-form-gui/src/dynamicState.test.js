
import { getDynamic, setDynamic } from './dynamicState';

it('introduces value in given execution contex', (done) => {
    setDynamic('x', 3, () => { expect(getDynamic('x')).toBe(3); done(); });
});

it('nests correctly', (done) => {
    setDynamic('x', 5, () => {
        expect(getDynamic('x')).toBe(5);
        setDynamic('x', 3, () => expect(getDynamic('x')).toBe(3));
        expect(getDynamic('x')).toBe(5);
        done();
    });
});
