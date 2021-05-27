import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

fdescribe('Async example', () => {
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

    it('async example - promises', fakeAsync(() => {
        let flag = false;

        Promise.resolve().then(() => {
            return Promise.resolve();
        })
        .then(() => {
            flag = true;
        });

        flushMicrotasks();
        expect(flag).toBeTrue();
    }));

    it('asyn example - promises and setTimeout', fakeAsync(() => {
        let counter = 0;

        Promise.resolve().then(() => {
            counter += 10;

            setTimeout(() => {
                counter++;
            }, 1000);
        });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(1000);

        expect(counter).toBe(11);
    }));
});