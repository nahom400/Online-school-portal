import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Dashboard from './Dashboard'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/"
const GET_TOKEN_URL = "auth/get_token/"
const VALIDATE_TOKEN_URL = 'auth/validate_user/'

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

async function obtainToken(username, password){
		const res = await axios.post('http://localhost:8000/auth/get_token/',
			({'username':username, 'password':password}))
		const token = res.data.token
		return token
	}

function App(){

	const [myToken, setMyToken] = useState(localStorage.getItem('ACCESS_TOKEN')) 
	const [profileData, setProfileData] = useState(null)
	
	/*##################################	
	SIGN IN ACTION TO CREATE A LOGIN-SESSION:
		This block of code is for initiating a login session
		with user. It authenticates the username and password
		then saves the token and username to localStorage for 
		subsequent logins to use to validate and use
	##################################*/
	

	function signInAction(formData){ 
		const role = formData.get('role_selector')
		const username = formData.get('username')
		const password = formData.get('password')

		localStorage.setItem("USER_NAME", username)
		localStorage.setItem("ROLE", role)
		obtainToken(username, password).then(token=>{
			localStorage.setItem('ACCESS_TOKEN', token)
			setMyToken(token)
		})

	}


		
		/*##################################	
		CORE SIGN IN LOGIC DOES THESE:
			1. CREATING A SESSION
			2. VALIDATING A SESSION IF EXISTS
			3. 
		##################################*/	
	if (myToken){
		const username = localStorage.getItem('USER_NAME')
		const role = localStorage.getItem('ROLE')
		const profileFetch = fetch(`http://localhost:8000/auth/${role}/${username}/`, 
			{headers:{'Authorization': `Token ${myToken}`}}
			).then(res => res.json())
		if (!profileData){
		profileFetch.then(data=>{
				setProfileData(data)})
		}
		}

	
	

	
	/*##################################	
	LOGOUT LOGIC : removes token and username 
	||	from local storage; removes cached urls and
	||	tokens; the initial page becomes the login 
	VV	page for all users;
	##################################*/
	
	function logOut(){
		localStorage.removeItem("ACCESS_TOKEN")
		localStorage.removeItem("USER_NAME")
		setMyToken(null)
		setFullUrl(null) 
		setUserValidated(false)
		setProfileData(null)
	}

	if (profileData){
		return (<Dashboard profileData={profileData}
					logOut={logOut}
					token={myToken}
					/>)
	}

	else if (!profileData){
		return (<SignBox signInAction={signInAction}/>)	
	}
}

export default App;