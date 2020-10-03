<template>
    <div class="info ticket__info">
        <main class="info__main">
            <div class="info__airline">
                <div class="info__icon">
                    <img :src="`https://aviata.kz/static/airline-logos/80x80/${data.validating_carrier}.png`" alt="">
                </div>
                <p>{{AIRLINES[data.validating_carrier]}}</p>
            </div>
            <div 
                v-if="data.itineraries && data.itineraries.length > 0" 
                class="info__itineraries"
                :class="{transfer: data.itineraries[0][0].segments.length == 2, transfer__more: data.itineraries[0][0].segments.length > 2}"
            >
                <div 
                    v-for="(item, index) in data.itineraries[0][0].segments" 
                    :key="index" 
                    class="info__segments flex" 
                    
                >
                    <div v-if="item.dep_time && index < 1" class="info__from">
                        <span>{{item.dep_time.slice(0, -5).toLowerCase()}}</span>
                        <h2>{{item.dep_time.slice(-5)}}</h2>
                    </div>
                    <div class="info__line line">
                        <div class="line__block flex">
                            <small v-if="index < 1">{{item.dest_code}}</small>
                            <p>
                                <span v-if="index < 1">{{travelTime(data.best_time)}}</span>
                                <span style="opacity: 0;" v-else-if="index == 1 && data.itineraries[0][0].segments.length > 2">0</span>
                                <span v-else></span>
                            </p>
                            <small 
                                v-if="
                                    (data.itineraries[0][0].segments.length == 1 && index == 0) || 
                                    (data.itineraries[0][0].segments.length > 1 && index == data.itineraries[0][0].segments.length - 1)"
                                >{{item.origin_code}}</small>
                            <!-- <p>{{index = 1 && data.itineraries[0][0].segments.length > 2}}</p> -->
                            <div class="line__point"></div>
                        </div>
                        <div v-if="index < 1">
                            <p style="color: var(--green-color);" v-if="data.itineraries[0][0].segments.length == 1">Прямой рейс</p>
                            <p style="color: var(--orange-color);" v-if="data.itineraries[0][0].segments.length == 2">
                                через {{item.airport_dest}}
                            </p>
                            <p style="color: var(--orange-color);" v-if="data.itineraries[0][0].segments.length > 2">
                                {{data.itineraries[0][0].segments.length - 1}} пересадки
                            </p>
                        </div>
                    </div>
                    <div 
                        v-if="
                            item.arr_time && 
                            (data.itineraries[0][0].segments.length == 1 && index == 0) || 
                            (data.itineraries[0][0].segments.length > 1 && index == data.itineraries[0][0].segments.length - 1)
                        " class="info__to">
                        <span>{{item.arr_time.slice(0, -5).toLowerCase()}}</span>
                        <span style="color: var(--red-color);">{{dateCount(data.itineraries[0][0].segments[0].dep_time_iso, data.itineraries[0][0].segments[data.itineraries[0][0].segments.length - 1].arr_time_iso)}}</span>
                        <h2>{{item.arr_time.slice(-5)}}</h2>
                    </div>
                </div>
            </div>
        </main>
        <div class="info__bottom bottom">
            <div class="bottom__detail">
                <a>Детали перелета</a>
            </div>
            <div class="bottom__detail">
                <a>Условия тарифа</a>
            </div>
            <div v-if="!data.refundable" class="info__refundable flex">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.62478 4.63247L2.18383 5.00014L2 3.77966L5.66142 3.22817L6.21291 6.88958L4.99244 7.07341L4.62478 4.63247Z" fill="#707276"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50024 3.53116C3.45478 4.96007 2.1168 7.33198 2.1168 10.0164C2.1168 14.3825 5.65618 17.9218 10.0222 17.9218C14.3883 17.9218 17.9277 14.3825 17.9277 10.0164C17.9277 5.66297 14.4087 2.13144 10.0601 2.11105L10.035 3.11098C13.8429 3.11789 16.9277 6.2069 16.9277 10.0164C16.9277 13.8302 13.836 16.9218 10.0222 16.9218C6.20847 16.9218 3.1168 13.8302 3.1168 10.0164C3.1168 7.82671 4.13598 5.87507 5.72584 4.60995L5.50024 4.61576V3.99864V3.53116Z" fill="#707276"/>
                    <path d="M1.64918 16.7664L1.2933 17.1176L1.64451 17.4735L2.51148 18.352L2.86269 18.7078L3.21857 18.3566L18.2986 3.47419L18.6545 3.12298L18.3032 2.7671L17.4363 1.88863L17.0851 1.53275L16.7292 1.88397L1.64918 16.7664Z" fill="#707276" stroke="white"/>
                </svg>
                <p>невозвратный</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            data: {
                type: Object,
                default: () => {}
            },
        },
        computed: {
            ...mapGetters([
                'AIRLINES'
            ])
        },
        methods: {
            travelTime(sec) {
                let min = sec / 60 % 60,
                    hour = parseInt(sec / 60 / 60)
                let time = `${hour ? hour + ' ч' : ''}  ${min ? min + ' м' : ''}`
                return time
                
            },
            dateCount(dest = new Date, arr = new Date) {
                let firstDate = dest.slice(8, 10),
                    lastDate = arr.slice(8, 10)
                let result = lastDate - firstDate
                if(result < 0) {
                    let lastMonthDate = new Date(Date.parse(dest) - (firstDate * 24 * 60 * 60 * 1000)).getDate() || 30
                    console.log(lastMonthDate, firstDate, lastDate)
                    result = parseInt(lastMonthDate - firstDate + +lastDate)
                }
                return result ? `+${result}` : '' 
            }
        },
    }
</script>

<style scoped>
    .ticket__info {
        background: #FFF;
        border-radius: 4px 0 0 4px;
        width: calc(100% - 240px);
        font-size: 12px;
        box-sizing: border-box;
        padding: 40px 0 20px 44px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .info__bottom {
        display: flex;
        align-items: center;
    }
    .info__bottom .flex {
        align-items: center;
    }
    .bottom__detail {
        margin-right: 23px;
    }
    .bottom__detail a {
        color: #7284E4;
        border-bottom: 1px dashed rgba(114, 132, 228, .5);
    }
    .info__itineraries {
        text-align: center;
        display: flex;
        position: relative;
    }
    .info__itineraries.transfer > div:first-child p, .info__itineraries.transfer__more > div:first-child p {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .info__itineraries p {
        margin: 5px 0 0;
        line-height: 5px;
    }
    .info__itineraries.transfer .line__block {
        width: 84px;
    }
    .info__itineraries.transfer__more .line__block {
        width: 56px;
    }
    .line__block {
        width: 168px;
        border-bottom: 1px solid #B9B9B9;
        margin: 10px 0 0;
        flex-wrap: wrap;
    }
    .info__itineraries > div:first-child .line__block {
        margin-left: 30px;
    }
    .info__itineraries > div:last-child .line__block {
        margin-right: 30px;
    }
    .line__point {
        width: 100%;
        padding-bottom: 5px;
        position: relative;
    }
    .info__itineraries > div:first-child .line__point::before {
        content: '';
    }
    .line__point::before, .line__point::after {
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #B9B9B9;
        box-sizing: border-box;
        border-radius: 50% 50%;
        bottom: -3px;
        background: #FFF;
    }
    .line__point::before {
        left: 0;
    }
    .line__point::after {
        right: 0;
        content: '';
    }
    .line__block small {
        color: #B9B9B9;
    }
    .info__airline {
        width: 128px;
        display: flex;
        align-items: center;
    }
    .info__airline img {
        max-width: 21px;
        margin-right: 5px;
    }
    .info__segments h2 {
        font-size: 24px;
        margin: 0;
    }
    .info__main {
        display: flex;
    }
    .info__refundable svg {
        margin-right: 8px;
    }
    .info__refundable {
        color: #707276;
    }
    @media (max-width: 1200px) {
        .ticket__info {
            padding-left: 20px;
        }
    }
</style>