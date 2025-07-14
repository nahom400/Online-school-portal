import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Entry from './Entry'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_token/"

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

function App(){

	const [myToken, setMyToken] = useState(localStorage.getItem('ACCESS_TOKEN')) // if this value is non-null our website renders the entry page
	const [fullUrl, setFullUrl] = useState(null) // whenever this changes our SWR fetches authentication from database 

	// function fired when we submit the form: role, username and pfsassword
	function signInAction(formData){ 
		const role = formData.get('role_selector')
		const username = formData.get('username')
		const password = formData.get('password')

		const params = new URLSearchParams({role, username, password})
		const FULL_URL = BASE_URL + REQUEST_URL + `?` + params.toString() //just for the time being this is the way we are doing the url query. So these are the data that django gets by regex!

		setFullUrl(FULL_URL) // triggers the SWR to fetch 
	}

	function logOut(){
		localStorage.removeItem("ACCESS_TOKEN") //All localStorage keys get removed
		localStorage.removeItem("USER_NAME")
		// localStorage.removeItem("ROLE") // comment this out to remember role for logins
		setMyToken(null) //ensures that the user comes to the login page
		setFullUrl(null) // we must set full url to null otherwise if the user tries to relogin without reloading the page; he/she fails because afterall the fullurl won't change so SWR will not be fired again for the same state!
	}

	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher, {revalidateIfStale:false})
	useEffect( ()=>
		{
			
			if (response?.error){
				console.log("ERROR UNKNOWN ERROR")
			}
			if (response?.token){
				localStorage.setItem("ACCESS_TOKEN",response.token)
				localStorage.setItem("USER_NAME",response.echo.username)
				localStorage.setItem("ROLE", response.echo.role)
				setMyToken(response.token) // Ensure we go to the entry page!
			}

		},[response] // this line means at startup or whenever 'response' changes  
	)
	return(
		<div>
			{/*<h1 class="">This is the portal for Teachers and Students </h1>
			<p>Please sign-in: if you're a teacher it takes you to the teacher's portal and if you're a student it takes you to the students portal</p>*/}

			{ myToken ? <Entry 	role={localStorage.getItem('ROLE')}
								token={myToken}
							 	username={localStorage.getItem("USER_NAME")}
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