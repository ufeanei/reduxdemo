const redux = require('redux')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default

//store
const initialstore = {
    loading: false,
    users:[],
    errors:''
}

// declare action types
    const   FETCH_USERS_REQUEST ='FETCH_USERS_REQUEST'
    const FETCH_USERS_SUCCESS = 'FECTCH_USERS_SUCCESS'
    const FETCH_USERS_FAILURE = 'FECTCH_USERS_FAILURE'

    // create te action creators

    const fetchUR = ()=>{
        return{
            type: FETCH_USERS_REQUEST
        }
    }


    const fetchUS = (users)=>{
        return{
            type: FETCH_USERS_SUCCESS,
            payload: users
        }
    }


    const fetchUF =(error) =>{
        return{
            type: FETCH_USERS_FAILURE,
            payload: error
        }
    }

    // create reducer

    const reducer = (state= initialstore, action) =>{

        switch(action.type){
            case FETCH_USERS_REQUEST:
                return{
                    ...state,
                    loading:true
                }

            case FETCH_USERS_SUCCESS:
                return{
                    loading:false,
                    users: action.payload,
                    error: ''
                }
            
            case FETCH_USERS_FAILURE:
                return{
                    loading: false,
                    users: [],
                    error: action.payload
                }
            default: return state
        }
    }

    const fetchuser = () =>{
        return function(dispatch){
            dispatch(fetchUR())
            axios.get('https://josonplaceholder.typicode.com/users')
            .then(response => {
               const users = response.data.map(user => user.id)
               dispatch(fetchUS(users))
            })
            .catch(error =>{
            dispatch(fecthUF(error.message))
            })

        }
    }

    const store = createStore(reducer, applyMiddleware(thunkMiddleware))
    store.subscribe(()=>{console.log(store.getState())}) 
    store.dispatch(fetchuser())