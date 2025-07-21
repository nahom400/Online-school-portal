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
			
			return {...state, formMode:true, myToken:null,formValidating:false, status:action.status}
		}
		case "Requesting Token":{
			
			return {...state, tokenRequest:"waiting", formValidating:true, status:""}
		}
		case "Requesting Profile Data":{
			
			return {...state, profileDataRequest:"waiting"}
		}
		case "Token Response":{
			
			return {...state, tokenRequest:action.response, myToken:action.token, formValidating:false, formMode:false}
		}
		case "Profile Data Response":{

			return {...state, profileDataRequest:action.response, profileData:action.profileData}
		}
		case "Logout":{
			localStorage.removeItem('ACCESS_TOKEN')
			return {...initialLoginState, myToken:null}
		}
		default:{
			return {...state}
		}
	}
	throw Error('Unknown action: ' + action.type);

}

/*
###############################
useReducer for the scores page
###############################
*/
const initialState = {
	"initialized":false,
	"data":[],
	"editmode":true,
	"putValidating":false,
	"getValidating":false,
	"status":"",
	"fullUrl":null
}

function reduceScores(state, action){
	switch (action.type){
	case "Getting From Database":{ // THESE ARE THE STEPS 1,5

		
		return {...state, initialized:true, getValidating:true}
		}
	
	case "Edit Mode Off":{//2,6

		return {...state, data:action.data, editmode:false, getValidating:false}
		}

	case "Doing Put To Database":{//4

		return {...state, putValidating:true}
		}
	
	case "Edit Mode On":{//3

		return {...state, editmode:true}
		}
	case "Reinitiate":{
		return {...initialState}
		}
	}


	throw Error('Unknown action: ' + action.type);

}

export {initialLoginState, reduceLogin};
export {initialState, reduceScores};
