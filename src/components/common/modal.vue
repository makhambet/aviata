<template>
    <div class="modal">
        <div class="modal__content">

        </div>
        <div @click="$emit('close')" class="close"></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .3);
        /* background: rgba(0, 0, 0, .3); */

    }
    .modal__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        max-width: 90%;
        box-sizing: border-box;
        background: #FFF;
        padding: 20px 30px;
        border-radius: 20px;
        z-index: 2;
    }
    .close {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        left: 0;
    }
</style>