function SignBox({signInAction, isValidating, error}){

	return (
	<div className="shadow">
		<form action={signInAction} className="SignBox">
			<h4>Online School Portal</h4>
			<label> Role:   
				<select name="role_selector" id="role_selector" defaultValue={localStorage.getItem('ROLE')}>
				 	<option value="teacher">Teacher</option>
				 	<option value="student">Student</option>
				 </select> 

			</label>
			<label> Username:  
				<input name="username" className="input" type="text" /> 
			</label>
			<label> Password: 
				<input name="password" className="input" type="password" />
			</label>
			<button className="btn btn-primary"> Log-in </button>
			{/*<button className="btn btn-secondary" disabled>Admission</button>*/}

		</form>
	</div>

	)
}

export default SignBox;