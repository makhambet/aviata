<template>
    <div class="result">
        <ticket-block 
            v-for="(item, index) in data" 
            :key="index"
            :data="item"
        ></ticket-block>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                default: () => []
            },
        },
        components: {
            TicketBlock: () => ({
                component: import('@/components/ticket')
            }),
        },
    }
</script>

<style scoped>
    .result > div:not(:last-child) {
        margin-bottom: 12px;
    } 
</style>