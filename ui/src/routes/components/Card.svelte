<script>
    function move(event) {
        console.log(event);
        event.stopPropagation();
        event.target.classList.add('dragging');
    }
</script>
<div class="card">
    <slot />
</div>
<style>
    .card{
        min-width: 120px;
    }
</style>
