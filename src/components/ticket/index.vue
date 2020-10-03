<template>
    <div class="ticket flex">
        <info-section :data="data"></info-section>
        <action-section :services="data.services" :price="data.price"></action-section>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default: () => {}
            },
        },
        components: {
            InfoSection: () => ({
                component: import('./components/info')
            }),
            ActionSection: () => ({
                component: import('./components/action')
            }),
        },
    }
</script>

<style scoped>
    .ticket {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        
        width: 100%;
    }
</style>