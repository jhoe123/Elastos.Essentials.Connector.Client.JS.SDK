<script lang="ts">
    import { onMount } from 'svelte';
    import qrcode from 'qrcode-generator';
    import { navService } from '../nav.service';
    import type { EssentialsConnectNavParams } from '../navparams/essentialsconnect';

    export class EssentialsConnectComponent {
    }

    let component = new EssentialsConnectComponent();

    onMount(async () => {
        let navParams = navService.activeView.params as EssentialsConnectNavParams;

        console.log("Showing essentials connect popup: ", navParams);

        var qr = qrcode(0, 'L');
        qr.addData(navParams.connectUrl);
        qr.make();

        (document.getElementById('connectqrcode') as HTMLImageElement).src = qr.createDataURL();
	});
</script>

<style lang="scss">
    .container {
        margin: 0;
        padding: 20px;
        height: 100%;
    }

    footer {
        border: none;
        padding: 20px;
    }
</style>

<div class="container">
    <h1>Elastos Essentials Connect</h1>
    <p>Please scan the following code from Elastos Essentials to link your identity to this website:</p>
    <img id="connectqrcode" alt="Connect QR code"/>
</div>

<footer>
</footer>

