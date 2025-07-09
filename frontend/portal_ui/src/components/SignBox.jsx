import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

const BASE_URL = ""
function SignBox(){
	function signInAction(formData){
	}

	return (
		<form action={signInAction} className="SignBox">

			<label> Username:  
				<input name="username" className="input" type="text" /> 
			</label>
			<label> Password: 
				<input name="password" className="input" type="password" />
			</label>
			<button type="submit"> Go </button>
		</form>
		)
}

export default SignBox;