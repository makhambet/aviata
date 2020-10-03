<template>
    <div class="result">
        <ticket-block 
            v-for="(item, index) in data" 
            :key="index"
            :data="item"
        ></ticket-block>
        <h3 v-if="!data.length">Нет результатов. Попробуйте изменить параметры фильтра</h3>
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