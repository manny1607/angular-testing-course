import { fakeAsync, flush, tick } from "@angular/core/testing";

describe('Async example', () => {
    // it('async example with Done', (done: DoneFn) => {
    //     let flag = false;
    //     setTimeout(() => {
    //         flag = true; 
    //         expect(flag).toBeTrue();
    //         done();
    //     }, 1000);
    // });

    it('async example - fakeasync with tick()', fakeAsync(() => {
        let flag = false;

        setTimeout(() => {
            flag = true;
        }, 1000);
        tick(1000);
        expect(flag).toBeTrue();
    }));

    it('async example - fakeasync with flush()', fakeAsync(() => {
        let flag = false;
        let badge = false;

        setTimeout(() => {
            flag = true;
        }, 2000);

        setTimeout(() => {
            badge = true;
        }, 1000);

        flush();

        expect(flag).toBeTrue();
        expect(badge).toBeTrue();
    }));
});