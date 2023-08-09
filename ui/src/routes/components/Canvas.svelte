<script>
    import Card from './Card.svelte';
    import Modal from './Modal.svelte';
    import Draggable from './Draggable.svelte';
    import {onDestroy, onMount} from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let selectedItem = null;
    let items = [];
    let canvas = null;
    let scroll = null;

    function drawLines(data) {
        if(data?.detail) {
            let iof = items.indexOf(data?.detail?.subject);
            if(iof !== -1) {
                console.log('update', data);
                items[iof].left = data?.detail?.left;
                items[iof].top = data.detail?.top;
                items = [
                    ...items,
                ];
                save(items);
            }
        }
        console.log('drawing...')
        items.forEach((item) => {
            if(item.line?.remove) item.line.remove();
            try {
                if(item.next) {
                    item.line = new LeaderLine(
                        document.getElementById(item.id),
                        document.getElementById(item.next),
                        {
                            startSocket: 'bottom',
                            endSocket: 'top',
                            path: 'grid'
                        }
                    );
                }
            }catch (err) { }
        })
    }

    let selectNextItem = false;

    function addItem(item) {
        return () => {
            selectedItem = item;
            selectNextItem = true;
        };
    }

    function dismissDialog(){
        selectNextItem = false;
    }

    onMount(() => {
        if(localStorage.getItem('items')){
            items = JSON.parse(localStorage.getItem('items'));
        }
        setTimeout(() => {
            drawLines();
        }, 1000);
    });

    onDestroy(() => {
        items.forEach((item) => {
            if(item.line?.remove){
                item.line?.remove();
            }
        })
    })

    function appendItem(type) {
        return () => {
            selectNextItem = false;
            let iof = items.indexOf(selectedItem);
            let id = items.length + 1;
            items[iof].next = id;
            items = [
                ...items,
                {
                    id,
                    'name': 'test',
                    left: selectedItem.left + 100,
                    top: 100,
                }
            ];
            selectedItem = null;
            save(items);
            drawLines({});
        }
    }

    function save(items) {
        console.log('save', items);
        localStorage.setItem('items', JSON.stringify(items));
    }
    let endMoving = false;
    let pointerPosition = {left: 0, top: 0};
    let top = 0;

    let offsetLeft = 0;
    let offsetTop = 0;

    let moving = false;

    let currentElement = null;

    function onMouseDown(event) {
        if(event.target.classList.contains('square')) {
            console.log('square');
            return startLine(event);
        }
        if(event.target.classList.contains('draggable')) {
            currentElement = event.target;
            let rect = currentElement.getBoundingClientRect();
            offsetLeft = event.clientX - rect.left;
            offsetTop = event.clientY - rect.top;
            moving = true;
        }
    }

    function onMouseMove(e) {
        pointerPosition = {
            left: e.clientX + scroll.scrollLeft + 10,
            top: e.clientY + scroll.scrollTop,
        };

        if (moving) {

            let rect = currentElement.getBoundingClientRect();
            console.log(rect);
            currentElement.parentNode.style.left = (e.clientX + scroll.scrollLeft - offsetLeft) + 'px';
            currentElement.parentNode.style.top = (e.clientY + scroll.scrollTop - offsetTop) + 'px';
            // dispatch('update', {left, top, subject});
        }
        if(endMoving){
            drawLine(e);
        }
    }

    function onMouseUp(event) {
        moving = false;
        if(endMoving) {
            stopLine(event);
        }
        if(currentElement){
            let id = currentElement.parentNode.id;
            items.forEach(item => {
                if(item.id === id) {
                    item.left = parseInt(currentElement.parentNode.style.left);
                    item.top = parseInt(currentElement.parentNode.style.top);
                }
            })
            items = items;
            drawLines();
        }
    }

    let startPoint = null;
    let drawingLine = null;
    let endX = 0;
    let endY = 0;
    let pointer = null;

    function startLine(event) {
        endMoving = true;
        event.target.classList.add('active');
        event.stopPropagation();
        event.preventDefault();
        startPoint = event.target;
        show(startPoint);
    }

    function stopLine(event){
        endMoving = false;
        event.stopPropagation();
        if(drawingLine != null){
            drawingLine.remove();
            if(event.target.classList.contains('square')){
                hide(startPoint);
                hide(event.target);
                console.log('dropped on a square', event.target);
                drawingLine = null;
                new LeaderLine(startPoint, event.target);
            }else{
                console.log('not dropped on a square');
            }
        }
    }

    function drawLine(event) {
        if(drawingLine!=null && drawingLine.remove) drawingLine.remove();
        endX += event.movementX;
        endY += event.movementY;
        if(event.target.classList.contains('square')){
            console.log('is square');
            show(event.target);
            try{
                drawingLine = new LeaderLine(startPoint, event.target);
            }catch(err){

            }
        }else{
            try{
                drawingLine = new LeaderLine(startPoint, pointer)
            }catch(err){

            }
        }
    }

    let options = [
        {
            label: 'Add',
            onClick: (s) => {
                addItem(s)();
            }
        },
        {
            label: 'Delete',
            onClick: (s) => {
                alert('test');
            }
        }
    ];

    function show(ele){
        ele.style.opacity = 1;
    }
    function hide(ele){
        ele.style.opacity = 0;
    }

</script>
<div class="scroll" id="scroll" bind:this={scroll} on:scroll={drawLines}>
<div class="canvas" id="canvas" bind:this={canvas}>
    {#each items as item}
        <Draggable left="{item.left}" top="{item.top}" on:update={drawLines} subject="{item}" options={options}>
            <div id="{item.id}">
                <Card>
                    <h4>{item.name} #{item.id}</h4>
                </Card>
            </div>
        </Draggable>
    {/each}
</div>
<div>
    {#if selectNextItem === true}
        <Modal on:dismiss={dismissDialog}>
            <h3 on:click={dismissDialog}>Select task type</h3>
            <Card>
                <h5 on:click={appendItem('CONDITIONAL')}>Conditional</h5>
            </Card>
            <Card>
                <h5 on:click={appendItem('HTTP_REQUEST')}>Http Request</h5>
            </Card>
            <Card>
                <h5 on:click={appendItem('CODE_BLOCK')}>Code block</h5>
            </Card>
        </Modal>
    {/if}
    <pre>
        {JSON.stringify(items, null, 2)}
    </pre>
</div>

<style>
    .canvas{
        position: relative;
        min-height: 100vh;
        width: 100vw;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    .bold{
        font-weight: bold;
    }
    .scroll{
        width: 100%;
        height: 100vh;
        overflow: scroll;
        position: fixed;
        top: 0;
        left: 0;
    }
    .pointer{
        background: #ccc; z-index: +9999;
        width: 2px;
        height: 2px;
        overflow: hidden;
        position:absolute;
    }
</style>

    <div style="top:{pointerPosition.top}px;left:{pointerPosition.left}px;" bind:this={pointer}>
        Top: {pointerPosition.top}<br/>
        Left: {pointerPosition.left}
    </div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:mousedown={onMouseDown} />
