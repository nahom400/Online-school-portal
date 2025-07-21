import { initialLoginState, reduceLogin } from './useReducers'
import Dashboard from './Dashboard'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'

import { useState, useReducer } from 'react'
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/"

async function obtainToken(username, password){
		const res = await axios.post('http://localhost:8000/auth/get_token/',
			({'username':username, 'password':password}))
		const token = res.data.token
		return token
	}

function App(){

	const [state, dispatch] = useReducer(reduceLogin, initialLoginState)
	


	/*##################################	
	SIGN IN ACTION TO CREATE A LOGIN-SESSION:
		This block of code is for initiating a login session
		with user. It authenticates the username and password
		then saves the token and username to localStorage for 
		subsequent logins to use to validate and use
	##################################*/
	

	function handleLogIn(formData){ 
		const role = formData.get('role_selector')
		const username = formData.get('username')
		const password = formData.get('password')

		dispatch({type:"Requesting Token"})
		obtainToken(username, password).then(token=>{
			dispatch({type:'Token Response', token:token})
			localStorage.setItem('ACCESS_TOKEN', token)
			localStorage.setItem('USER_NAME', username)
			localStorage.setItem('ROLE', role)
		}).catch((error)=>{
			dispatch({type:"Submit Credentials Please",
		 	status:"Error: Please check your username and password credentials!"})
					})

	}


	/*##################################	
	Another fetch to obtain the state.profileData
	after authentication
	##################################*/
	if (!state.myToken && !state.formMode){
		dispatch({type:"Submit Credentials Please", status:""})

	}
	if (state.formMode){
		return (
		<SignBox 	loginAction={handleLogIn}
					disable={state.formValidating}
					status={state.status}

			 />)	
	}
	else if (state.myToken && !state.profileData){
		// dispatch({type:'Requesting Profile Data'})
		const username = localStorage.getItem('USER_NAME')
		const role = localStorage.getItem('ROLE')
		const profileFetch = fetch(`http://localhost:8000/auth/${role}/${username}/`, 
			{headers:{'Authorization': `Token ${state.myToken}`}}
			)
		// .then(res => res.json())
		profileFetch.catch((error)=>{
		})
		profileFetch.then((res)=>{
			const data = res.json()
			// data.then(data)

			data.then((data)=>{
				if (data.username){

				dispatch({type:'Profile Data Response', profileData:data})
				}
				else{
					localStorage.removeItem("ACCESS_TOKEN")
					localStorage.removeItem("USER_NAME")
					dispatch({type:"Submit Credentials Please", status:"Error: Please check; you might have chosen the wrong role!"})
				}
				})

			})
		
		return(
			<>
			<div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
			<div className="spinner-border">		
			</div>
			<span>Loading Profile</span>
			</div>
			</>)
	}
		
	if (state.myToken){
		}
	
	/*##################################	
	LOGOUT LOGIC : removes token and username 
	||	from local storage; removes cached urls and
	||	tokens; the initial page becomes the login 
	VV	page for all users;
	##################################*/
	

		/*##################################	
		CORE SIGN IN LOGIC DOES THESE:
			1. CREATING A SESSION
			2. VALIDATING A SESSION IF EXISTS
			3. 
		##################################*/
	if (state.profileData){
		return (<Dashboard profileData={state.profileData}
					logOut={logOut}
					token={state.myToken}
					/>)
	}

	function logOut(){
		localStorage.removeItem("ACCESS_TOKEN")
		localStorage.removeItem("USER_NAME")
		dispatch({type:'Logout'})
	}
}

export default App;