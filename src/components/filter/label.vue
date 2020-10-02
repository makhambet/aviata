<template>
    <label class="checkbox">
        <slot></slot>
        <span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.95452 2.15273L3.24992 7.4454L0 4.19548L1.41421 2.78126L3.16429 4.53134L6.4597 0.824005L7.95452 2.15273Z"/>
            </svg>
        </span>
        <p>{{title}}</p>
    </label>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped>
    label.checkbox {
        cursor: pointer;
        position: relative;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
    }
    .checkbox input {
        opacity: 0;
    }
    .checkbox span {
        text-align: center;
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        border: 1px solid #B9B9B9;
        left: 0;
        top: 0;
        line-height: 12px;
        transition: background .3s;
        background: #FFF;
    }
    .checkbox span svg {
        fill: none;
        transition: all .3s;
    }
    .checkbox:hover svg {
        fill: #B9B9B9;
    }
    .checkbox span::before {
        /* position: absolute;
        content: " ";
        top: 50%;
        color: #fff;
        left: 50%;
        transform: translate(-50%, -50%); */
    }
    .checkbox input:checked + span svg {
        fill: #FFF;
    }
    .checkbox input:checked + span {
        background: var(--green-color);
        border-color: var(--green-color);
    }
    .checkbox p {
        margin: 0 0 0 12px;
    }
</style>