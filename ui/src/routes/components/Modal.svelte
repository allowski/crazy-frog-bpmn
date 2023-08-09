<script>
    import {createEventDispatcher} from "svelte";
    const dispatcher = createEventDispatcher();
    function dismiss() {
        dispatcher('dismiss');
    }
</script>
<div class="backdrop">
    <div class="exit" on:click={dismiss}></div>
    <div class="modal">
        <slot></slot>
    </div>
    <div class="exit" on:click={dismiss}></div>
</div>
<style>
    .backdrop{
        z-index: +999999;
        left: 0;
        background: rgba(0,0,0,0.4);
        position: fixed;
        top: 0px;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .exit{
        flex: 1;
        background: rgba(0,0,0,0.40);
        height: 100%;
    }
    .modal{
        margin: 10px;
        border-radius: 10px;
        max-width: 100%;
        width: 500px;
        background: #fff;
        padding: 10px;
    }
</style>
