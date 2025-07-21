/*
###############################
useReducer for the login action
###############################
*/

const initialLoginState = {
	"myToken":localStorage.getItem('ACCESS_TOKEN'),
	"formMode":false,
	"status":"",
	"formValidating":false,
	"tokenRequest":"false",
	"profileDataRequest":"false",
	"profileData":null,
}

function reduceLogin(state, action){
	switch(action.type){
		case "Submit Credentials Please":{
			const nextState = {...state, formMode:true, myToken:null,formValidating:false, status:action.status}
			console.log(nextState)
			return nextState
		}
		case "Requesting Token":{
			
			console.log({...state, tokenRequest:"waiting", formValidating:true})
			return {...state, tokenRequest:"waiting", formValidating:true, status:""}
		}
		case "Requesting Profile Data":{
			
			console.log({...state, profileDataRequest:"waiting"})
			return {...state, profileDataRequest:"waiting"}
		}
		case "Token Response":{
			
			console.log({...state, tokenRequest:action.response, myToken:action.token })
			return {...state, tokenRequest:action.response, myToken:action.token, formValidating:false, formMode:false}
		}
		case "Profile Data Response":{

			console.log({...state, profileDataRequest:action.response, profileData:action.profileData})
			return {...state, profileDataRequest:action.response, profileData:action.profileData}
		}
		case "Logout":{
			localStorage.removeItem('ACCESS_TOKEN')
			console.log({...initialLoginState, myToken:null})
			return {...initialLoginState, myToken:null}
		}
	}

}

/*
###############################
useReducer for the scores page
###############################
*/
const initialState = {
	"editmode":"",
	"update":""
}

export {initialLoginState, reduceLogin};