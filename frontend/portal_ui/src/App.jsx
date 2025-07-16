import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Entry from './Entry'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'

const BASE_URL = "http://127.0.0.1:8000/"
const GET_TOKEN_URL = "auth/get_token/"
const VALIDATE_TOKEN_URL = 'auth/validate_user/'

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

function App(){

	const [userValidated, setUserValidated] = useState(false)
	// If localStorage has the value it will not be null
	const [myToken, setMyToken] = useState(localStorage.getItem('ACCESS_TOKEN')) 
	// Whenever fullUrl changes our SWR fetches authentication from database 
	const [fullUrl, setFullUrl] = useState(null) 
	// useSWR
	const {data : responseData, isValidating} = useSWR(fullUrl, fetcher, {revalidateIfStale:false})

	
	
	/*##################################	

	SIGN IN ACTION TO CREATE A LOGIN-SESSION:

		This block of code is for initiating a login session
		with user. It authenticates the username and password
		then saves the token and username to localStorage for 
		subsequent logins to use to validate and use
	
	##################################*/
	

	//Function fired when we submit the username and password
	function signInAction(formData){ 
		const role = formData.get('role_selector')
		const username = formData.get('username')
		const password = formData.get('password')

		const params = new URLSearchParams({role, username, password})
		const FULL_URL = BASE_URL + GET_TOKEN_URL + `?` + params.toString() //just for the time being this is the way we are doing the url query. So these are the data that django gets by regex!
		console.log(FULL_URL)
		setFullUrl(FULL_URL) // triggers the SWR to fetch 
	}
		
		/*##################################	
		
		CORE SIGN IN LOGIC DOES THESE:
			1. CREATING A SESSION
			2. VALIDATING A SESSION IF EXISTS
			3. 
		
		##################################*/	
	useEffect( ()=>
		{
			
			if (responseData?.error){
				console.log(responseData.error)
			}
			// Notice responseData is fetched for both initial sign-in and for session!

			else if (responseData?.echo){
				if (!myToken){ 
					localStorage.setItem("ACCESS_TOKEN",responseData.echo.token)
					localStorage.setItem("USER_NAME",responseData.echo.username)
					localStorage.setItem("ROLE", responseData.echo.role)
					setMyToken(responseData.echo.token)
					// IF THERE'S TOKEN ALREADY WE DON'T NEED TO SET AGAIN!
				}
				setUserValidated(true) // EnsureS we go to the entry page!
			}
			else if (myToken && !userValidated){
				console.log("code reached")
				const role = localStorage.getItem('ROLE')
				const username = localStorage.getItem('USER_NAME')
				const token = localStorage.getItem('ACCESS_TOKEN')

				const params = new URLSearchParams({ role, username, token})
				const FULL_URL = BASE_URL + GET_TOKEN_URL + `?` + params.toString() //just for the time being this is the way we are doing the url query. So these are the data that django gets by regex!
				console.log(FULL_URL)
				setFullUrl(FULL_URL)
			}
			//SCANS FOR A SESSION

		},[responseData] // This is the dependency to run the function; it means at startup or whenever 'responseData' changes!
	)

	
	/*##################################	
	LOGOUT LOGIC : removes token and username 
	||	from local storage; removes cached urls and
	||	tokens; the initial page becomes the login 
	VV	page for all users;
	##################################*/
	
	function logOut(){
		localStorage.removeItem("ACCESS_TOKEN") //All localStorage keys get removed
		localStorage.removeItem("USER_NAME")
		// localStorage.removeItem("ROLE") // COMMENT this out to remember role for logins
		setMyToken(null) //ensures that the user comes to the login page
		setFullUrl(null) // we must set full url to null otherwise if the user tries to relogin without reloading the page; he/she fails because afterall the fullurl won't change so SWR will not be fired again for the same state!
		setUserValidated(false)
	}

	return(
		<div>
			{/*<h1 class="">This is the portal for Teacherand Students </h1>
			<p>Please sign-in: if you're a teacher it takes you to the teacher's portal and if you're a student it takes you to the students portal</p>*/}

			{ userValidated ? <Entry 	role={localStorage.getItem('ROLE')}
								token={myToken}
							 	username={localStorage.getItem("USER_NAME")}
								profileData={responseData.echo}
							 	logOut={logOut}/> :  
							 	<SignBox signInAction={signInAction}/>
							 }
			{ isValidating ? <div className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75' style={{'z-index':1050}}>
				<div className="spinner-border">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>:null
			}

		</div>
		)
}

export default App;