<template>
    <div class="filter">
        <div class="filter__content">
            <h4 class="flex">
                <span>Опции тарифа</span>
                <svg @click="resetChoose()" v-show="refundable || baggage || straight" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6464 8.64648L13.2929 6.00004L10.6464 3.35359L11.3535 2.64648L14 5.29293L16.6464 2.64648L17.3535 3.35359L14.7071 6.00004L17.3535 8.64648L16.6464 9.35359L14 6.70714L11.3535 9.35359L10.6464 8.64648ZM2.91465 6.00003H8C8 6.34074 8.0284 6.67482 8.08296 7.00003H2.91465C2.70873 7.58263 2.15311 8.00003 1.5 8.00003C0.671573 8.00003 0 7.32846 0 6.50003C0 5.6716 0.671573 5.00003 1.5 5.00003C2.15311 5.00003 2.70873 5.41743 2.91465 6.00003ZM7.91465 10H9.52779C9.86799 10.3801 10.2559 10.7166 10.6822 11H7.91465C7.70873 11.5826 7.15311 12 6.5 12C5.84689 12 5.29127 11.5826 5.08535 11H0.5C0.223858 11 0 10.7762 0 10.5C0 10.2239 0.223858 10 0.5 10H5.08535C5.29127 9.41743 5.84689 9.00003 6.5 9.00003C7.15311 9.00003 7.70873 9.41743 7.91465 10ZM2.91465 14C2.70873 13.4174 2.15311 13 1.5 13C0.671573 13 0 13.6716 0 14.5C0 15.3285 0.671573 16 1.5 16C2.15311 16 2.70873 15.5826 2.91465 15H14.5C14.7761 15 15 14.7762 15 14.5C15 14.2239 14.7761 14 14.5 14H2.91465Z"/>
                </svg>
                <div class="filter__reset">Сбросить выбор</div>
            </h4>
            <div class="filter__block">
                <div class="filter__label">
                    <filter-label :title="'Только прямые'">
                        <input
                            value="Только прямые"
                            v-model="straight"
                            type="checkbox"
                        />
                    </filter-label>
                </div>
                <div class="filter__label">
                    <filter-label :title="'Только с багажом'">
                        <input
                            value="baggage"
                            v-model="baggage"
                            type="checkbox"
                        />
                    </filter-label>
                </div>
                <div class="filter__label">
                    <filter-label :title="'Только возвратные'">
                        <input
                            value="refundable"
                            v-model="refundable"
                            type="checkbox"
                        />
                    </filter-label>
                </div>
            </div>
        </div>
        <div class="filter__content">
            <h4>Авиакомпании</h4>
            <div class="filter__block">
                <div class="filter__label">
                    <filter-label :title="'Все'" :propsValue="'all'">
                        <input
                            @change="onChooseAll"
                            :value="'all'"
                            v-model="chooseAll"
                            type="checkbox"
                        />
                    </filter-label>
                </div>
                <div class="filter__label" v-for="(item, index) in AIRLINES" :key="index">
                    <filter-label :title="item">
                        <input
                            :value="index"
                            v-model="airlinesModel"
                            type="checkbox"
                        />
                    </filter-label>
                </div>
            </div>
        </div>
        <div v-show="!reset && airlinesModel.length == 0" class="reset">
            <a @click="reset()">Сбросить все фильтры</a>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                straight : false,
                baggage: false,
                refundable: false,
                chooseAll: true,
                airlinesModel: [],
                tarifModel: []
            }
        },
        computed: {
            ...mapGetters([
                'AIRLINES'
            ])
        },
        methods: {
            onChooseAll(e) {
                console.log(this.AIRLINES)
                if(this.chooseAll && this.AIRLINES) {
                    this.airlinesModel = []
                    for(let i in this.AIRLINES) {
                        this.airlinesModel.push(i)
                    }
                } else {
                    this.airlinesModel = []
                }
            },
            reset() {
                this.chooseAll = true
                this.onChooseAll()
            },
            resetChoose() {
                this.straight = this.baggage = this.refundable = false
            },
            async filter(e) {
                await this.$store.dispatch('getAirlines', {airlines: this.airlinesModel, straight: this.straight, baggage: this.baggage, refundable: this.refundable})
            }
        },
        components: {
            FilterLabel: () => ({
                component: import('./label')
            })
        },
        mounted () {
            this.reset()
        },
        watch: {
            airlinesModel() {
                if(this.airlinesModel.length && this.airlinesModel.length == Object.keys(this.AIRLINES).length) {
                    this.chooseAll = true
                } else this.chooseAll = false

                this.filter()
            },
            tarifModel() {
                console.log(this.tarifModel)
            },
            straight() {
                this.filter()
            },
            baggage() {
                this.filter()
            },
            refundable() {
                this.filter()
            }
        },
    }
</script>

<style scoped>
    .filter__content {
        background: #F5F5F5;
        border-radius: 4px;
        padding: 12px 4px 16px 12px;
        margin-bottom: 12px;
        position: relative;
    }
    .filter__reset {
        position: absolute;
        height: 41px;
        text-align: center;
        background: #FFF;
        border-radius: 6px;
        top: -52px;
        font-weight: normal;
        line-height: 41px;
        padding: 0 12px;
        right: -41px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid #E1E1E1;
        opacity: 0;
        visibility: hidden;
        transition: all .3s ease-in-out;
    }
    .filter__reset::after {
        position: absolute;
        content: ' ';
        width: 14px;
        height: 14px;
        background: #FFFFFF;
        left: 50%;
        top: calc(100% - 7px);
        transform: translateX(-50%);
        transform: rotate(45deg);
        border-right: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;
    }
    .filter__content h4 {
        font-weight: bold;
        margin-top: 0;
        font-size: 14px;
        align-items: center;
    }
    .filter__content h4 svg {
        cursor: pointer;
        fill: #B9B9B9;
        transition: all .3s ease-in-out;
    }
    .filter__content h4 svg:hover {
        fill: #7284E4;
    }
    .filter__content h4 svg:hover ~ .filter__reset {
        opacity: 1;
        visibility: visible;
    }
    .filter__block {
        max-height: 272px;
        overflow-y: auto;
        box-sizing: border-box;
        -webkit-overflow-scrolling:touch;
    }
    .filter__block::-webkit-scrollbar {
        width: 3px;
    }
    .filter__block::-webkit-scrollbar-track {
        /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    }    
    .filter__block::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #E1E1E1;
    }
    .filter__label:not(:last-child) {
        margin-bottom: 20px;
    }
    .reset a {
        color: #7284E4;
        font-size: 12px;
        line-height: 16px;
        border-bottom: 1px dashed #7284E4;
    }
</style>