import { Logger } from './logger';

const nspacePadding: string = Logger['padNamespace']('test');

describe('Logger', () => {

  describe('#log()', () => {
    it('calls the correct log function', () => {

      // ERROR / string
      spyOn(console, 'error');
      Logger.log('test', 'an error', Logger.ERROR);
      expect(console.error).toHaveBeenCalledWith(nspacePadding + 'an error');

      const lineObj: {} = {
        prop1: 1,
        prop2: 2
      };

      Logger.log('test', lineObj, Logger.ERROR);
      expect(console.error).toHaveBeenCalledTimes(3); // one time above

      // WARN
      spyOn(console, 'warn');
      Logger.log('test', 'a warning', Logger.WARN);
      expect(console.warn).toHaveBeenCalledWith(nspacePadding + 'a warning');

      // DEBUG
      spyOn(console, 'debug');
      Logger.log('test', 'a debug', Logger.DEBUG);
      expect(console.debug).toHaveBeenCalledWith(nspacePadding + 'a debug');

      // INFO
      spyOn(console, 'log');
      Logger.log('test', 'a log');
      expect(console.log).toHaveBeenCalledWith(nspacePadding + 'a log');
    });
  });

  describe('#padNamespace()', () => {
    it('pads short namespace', () => {
      expect(nspacePadding.length).toEqual(Logger['PADDING'] + 3);
    });

    it('truncates a long namespace', () => {
      expect(Logger['padNamespace']('reallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongnsamespace')
        .length).toEqual(Logger['PADDING'] + 3);
    });
  });
});
