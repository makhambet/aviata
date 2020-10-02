<template>
    <div v-if="price" class="ticket__action action">
        <h3>{{price}} ₸</h3>
        <button class="main-btn">Выбрать</button>
        <p class="action__info">Цена за всех пассажиров</p>
        <div class="action__other flex">
            <p>Нет багажа</p>
            <button>+ Добавить багаж</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            price: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped>
    .ticket__action {
        background: #F5F5F5;
        border-radius: 0px 4px 4px 0px;
        width: 240px;
        font-size: 12px;
        text-align: center;
        padding: 20px 15px;
        box-sizing: border-box;
    }
    .ticket__action h3 {
        font-size: 24px;
        margin: 0 0 13px;
    }
    button.main-btn {
        height: 40px;
        width: 200px;
    }
    .action__info {
        color: #707276;   
    }
    .action__other {
        align-items: center;
    }
    .action__other button {
        background: #EAF0FA;
        border-radius: 2px;
        border: none;
        height: 24px;
        width: 124px;
        color: #5763B3;
        padding: 3px 8px;
    }
</style>