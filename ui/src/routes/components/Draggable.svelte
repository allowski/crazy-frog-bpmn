<script>
    export let left = 100;
    export let top = 100;
    export let subject;
    export let points = {
        TOP_LEFT: null,
        TOP_CENTER: null,
        TOP_RIGHT: null,
        CENTER_LEFT: null,
        CENTER_RIGHT: null,
        BOTTOM_LEFT: null,
        BOTTOM_CENTER: null,
        BOTTOM_RIGHT: null,
    };
    export let options = [
        {
            label: 'Add',
            onClick: (s) => {
                alert('ok');
            }
        },
        {
            label: 'Delete',
            onClick: (s) => {

            }
        }
    ]
</script>

<style>
    .draggable-container {
        display: flex;
        flex-direction: row;
        user-select: none;
        cursor: move;
        position: absolute;
    }
    .draggable-container>.draggable{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .frame{
        outline-offset: -7px;
        outline: 2px solid #999;
        display: grid;
        grid-template-columns: auto auto auto;  /* grid has two columns; content defines width */
        justify-content: space-between;    /* horizontal alignment of grid tracks */
        align-content: space-between;      /* vertical alignment of grid tracks */
        align-self: center;
    }
    .center{
        align-self: stretch;
        flex: 1;
    }
    .square{
        opacity: 0;
        z-index: +1;
        align-self: center;
        justify-self: center;
        width: 10px;
        height: 10px;
        background: #fff;
        border: 2px solid #999;
    }
    .square.active,
    .square.activated,
    .square.dragging,
    .square:hover{
        opacity: 1;
        transform: scale(1.2);
    }
    .options{
        z-index: +1111;
        display: flex;
        flex-direction: column;
    }
    .options>button{
        width: 40px;
        height: 40px;
    }
</style>

<div id={subject.id} style="left: {left}px; top: {top}px;" class="draggable-container">
    <div class="draggable" data-id={subject.id}></div>
    <div class="frame">
        <div id="tl" class="square" bind:this={points.TOP_LEFT}></div>
        <div id="tc" class="square" bind:this={points.TOP_CENTER}></div>
        <div id="tr" class="square" bind:this={points.TOP_RIGHT}></div>
        <div id="cl" class="square" bind:this={points.CENTER_LEFT}></div>
        <div class="center">
            <slot></slot>
        </div>
        <div id="cr" class="square tl" bind:this={points.CENTER_RIGHT}></div>
        <div id="bl" class="square tl" bind:this={points.BOTTOM_LEFT}></div>
        <div id="bc" class="square tc" bind:this={points.BOTTOM_CENTER}></div>
        <div id="br" class="square tr" bind:this={points.BOTTOM_RIGHT}></div>
    </div>
    <div class="options">
        {#each options as option}
            <button on:click={() => option.onClick(subject)}>{option.label}</button>
        {/each}
    </div>
</div>
