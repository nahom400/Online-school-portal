function SignBox({signInAction, isValidating, error}){

	return (
	<div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-primary-subtle">
		<form action={signInAction} className="SignBox shadow">
			<h4>Online School Portal</h4>
			<div className="d-flex flex-column gap-2">
				<div className="d-flex gap-2 justify-content-center align-items-center"><label> Role:   
				

			</label><select name="role_selector" id="role_selector" defaultValue={localStorage.getItem('ROLE')}>
				 	<option value="Teacher">Teacher</option>
				 	<option value="Student">Student</option>
				 </select> </div>
				<div className="d-flex gap-2 justify-content-around align-items-center"><label> Username:  
				
			</label><input name="username" className="input" type="text" /> </div>
				<div className="d-flex gap-2 justify-content-around align-items-center"><label> Password: 
				
			</label><input name="password" className="input" type="password" /></div>
				<div className="d-flex gap-2 justify-content-around align-items-center"></div>
			<button className="btn btn-primary"> Log-in </button>
			{/*<button className="btn btn-secondary" disabled>Admission</button>*/}
			</div>
		</form>
	</div>

	)
}

export default SignBox;