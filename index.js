const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM= 'BUY_ICECREAM'


const buycake = function(){
    return {
            type: BUY_CAKE,
            payload: 'First redux action'
        }
    
}

const buyicecream = function(){
    return{
        type:BUY_ICECREAM,
        payload: 'buy some iceream'

    }
}

const initialState = {
    numOfCakes: 10,
    numOfIceCream: 20
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: numOfCakes-1
        }
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCream: state.numOfIceCream-1
        }

        default: return state
    }
}

const store = createStore(reducer)
