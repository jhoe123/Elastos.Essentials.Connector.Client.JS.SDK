<script lang="ts">
    import { onMount } from 'svelte';
    import qrcode from 'qrcode-generator';
import { navService } from '../nav.service';
import type { GetCredentialsNavParams } from '../navparams/getcredentials';

    export class GetCredentialsComponent {
    }

    let component = new GetCredentialsComponent();

    onMount(async () => {
        console.log("Mouting GetCredentials component");

        let navParams = navService.activeView.params as GetCredentialsNavParams;

        console.log("Showing get credentials direct request: ", navParams.request.getPayload());

        let img = new Image();
        img.src = navParams.request.getQRCodeDataURL();
        document.getElementById('qrcodehandler').append(img);
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
    <p>Please scan the following code from Elastos Essentials to continue:</p>
    <div id="qrcodehandler"></div>
</div>

<footer>
</footer>

