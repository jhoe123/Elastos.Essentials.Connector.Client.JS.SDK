<script lang="ts">
    import { ViewType } from "../viewtype";
    import { navigatedView } from "../localidstores";
    import type { NavigatedView } from "../navigatedview";
    import { onDestroy } from "svelte";
    import GetCredentials from "./GetCredentials.svelte";
    import EssentialsConnect from "./EssentialsConnect.svelte";

    export let activeView: NavigatedView = { viewType: ViewType.Main };

    let unsubscriber = navigatedView.subscribe((newView)=>{
        activeView = newView;
    })

    onDestroy(()=>{
        unsubscriber();
    });
</script>

{#if activeView.viewType == ViewType.Main }
<GetCredentials></GetCredentials>
{:else if activeView.viewType == ViewType.EssentialsConnect }
<EssentialsConnect></EssentialsConnect>
{:else}
Nothing here
{/if}