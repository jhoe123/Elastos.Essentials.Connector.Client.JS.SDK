/**
 * As the connectivity SDK throws an exception if the application DID is not defined by the
 * client application, this method catches the exception and returns null in such case.
 */
export declare const getSafeApplicationDID: () => string;
