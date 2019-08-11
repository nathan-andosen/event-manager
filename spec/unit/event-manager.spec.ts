import { EventManager, EventListener, INextFn } from '../../src';

describe('Event Manager', () => {


  /**
   * emit()
   */
  describe('emit()', () => {
    it('should emit event', (done) => {
      let cnt = 0;
      class Hub extends EventManager {}
      const hub = new Hub();
      hub.on('event-a', (data, next) => {
        cnt++;
        expect(cnt).toEqual(1);
        expect(data.a).toEqual('a');
        done();
      });
      hub.emit('event-a', { a: 'a' });
    });

    it('should emit event and fire completed', () => {

    });

    it('should not emit event with no listeners', () => {

    });
  });



  it ('should fucking work', () => {
    expect(true).toEqual(true);
  });
});