import {createStore} from "redux"

let user = localStorage.getItem("currentUser")

try{
    user = JSON.parse(user) || {}
}catch(err){
    user = {}
}
let ischeck = false;
if(user.username){
    ischeck = true
}


let initState = {
    user,
    ischeck
}

let reducer = function(state=initState,action){
    switch(action.type){
        case "login":
            localStorage.setItem("currentUser",JSON.stringify(action.user))
            return {
                ischeck:true,
                user:action.user
            }
            case "logout":
                localStorage.removeItem("currentUser")
                return {
                    ischeck:false,
                    user:{}
                }
                default:return state
            }
        }
        
let store = createStore(reducer)

export default store
