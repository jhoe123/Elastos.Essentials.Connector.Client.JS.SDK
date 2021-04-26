import qrcode from "qrcode-generator";
import type { ISerializableRequest } from "../iserializablerequest";

export class GetCredentialsRequest implements ISerializableRequest {
    private qrCodeDataURL: string = null;

    // TODO: use the ready query type with claims, customization
    constructor(private query: any, private callbackURL: string) {
        this.makeQRCode();
    }

    private makeQRCode() {
        var qr = qrcode(0, 'L');
        qr.addData(this.getPayload());
        qr.make();
        this.qrCodeDataURL = qr.createDataURL();
    }

    getPayload(): string {
        let payload = "https://did.elastos.net/credaccess";
        payload += "?claims="+encodeURIComponent(JSON.stringify(this.query.claims));

        if (this.callbackURL)
            payload += "&callbackurl="+encodeURIComponent(this.callbackURL);

        // TODO: customization, other params

        return payload;
    }

    getQRCodeDataURL(): string {
        return this.qrCodeDataURL;
    }
}