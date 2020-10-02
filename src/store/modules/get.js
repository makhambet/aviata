import api from 'axios'

const sleep = m => new Promise(r => setTimeout(r, m))

let state = {
    airlines: null,
    flights: null
}

let mutations = {
    setAirlines (state, payload) {
        state.airlines = payload
    },
    setFlights (state, payload) {
        state.flights = payload
    }
}

let actions = {
    getAirlines: async ({commit}, payload) => {
        try {
            const {data} = await Promise.resolve(api.get('/results.json'));
            await sleep(100)
            await commit('setAirlines', data.airlines)
            
            if(payload) {
                // data.flights = data.flights.filter(e => e.validating_carrier == payload)
                if(payload.airlines) data.flights = data.flights.filter( ({validating_carrier}) => payload.airlines.find(f => f == validating_carrier) )
                if(payload.straight) data.flights = data.flights.filter( ({itineraries}) => itineraries[0][0].segments.length == 1 )
                if(payload.refundable) data.flights = data.flights.filter( ({refundable}) => console.log(refundable) )
            }
            await commit('setFlights', data.flights)
        } catch (err) {
            console.log(err)
            throw new Error('Внутреняя ошибка сервера, сообщите администратору')
        }
    },
    // filterFlights: async ({commit}) => {
    //     try {
    //         const {data} = await Promise.resolve(api.get('/results.json'));
            



    //         await sleep(100)
    //         await commit('setFlights', data.flights)
    //     } catch (err) {
    //         console.log(err)
    //         throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    //     }
    // },

}


export default {
    state,
    mutations,
    actions
}