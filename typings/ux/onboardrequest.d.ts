import type { ISerializableRequest } from "../iserializablerequest";
export declare class OnBoardRequest implements ISerializableRequest {
    private feature;
    private title;
    private introduction;
    private button;
    constructor(feature: string, title: string, introduction: string, button: string);
    getPayload(): string;
}
