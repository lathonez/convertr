'use strict';

export class Logger {

  private static PADDING: number = 25;
  public static DEBUG: number = 2;
  public static ERROR: number = 0;
  public static WARN: number = 1;

  /**
   * Log to console, depending on the Level different console fns will be used.
   *
   * Non-primitives will be logged as their own message in an additional line
   *
   * @param {string} nspace
   * @param {{}} line
   * @param {number} level
   */
  public static log(nspace: string, line: any, level?: number): void {

    let logFn: Function = null;

    switch (level) {
      case Logger.ERROR:
        logFn = (str => console.error(str));
        break;
      case Logger.WARN:
        logFn = (str => console.warn(str));
        break;
      case Logger.DEBUG:
        logFn = (str => console.debug(str));
        break;
      default:
        logFn = (str => console.log(str));
    }

    if (typeof(line) === 'string') {
      logFn(Logger.padNamespace(nspace) + line);
    } else {
      logFn(Logger.padNamespace(nspace) + 'non primitive data logged below');
      logFn(line);
    }

    if (level === Logger.ERROR) {
      // can be used to trigger some custom error notification etc
    }
  }

  /**
   * Pad the namespace to give a consistent log line
   *
   * @param {string} nspace
   * @returns {string}
   */
  private static padNamespace(nspace: string): string {

    if (nspace.length > Logger.PADDING) {
      nspace = nspace.substr(0, Logger.PADDING);
    }

    return nspace + ' '['repeat'](Logger.PADDING - nspace.length) + ' : ';
  }
}
