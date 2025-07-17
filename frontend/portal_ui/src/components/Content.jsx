import { useState, useEffect } from "react"
import useSWR from 'swr'

export default function Content({display, username, role, profileData}){
		console.log(profileData)
		if (display==='account'){
			return (<Account profileData={profileData}/>)
		}
		else if (display==='scores'){
			return (<Scores username={username} role={role}/>)
		}
		else if (display==='table'){
			return (<h1>Nothing's on the table</h1>)
		}
		else if (display==='help'){
			return (<Help/>)
		}
	}

/*##################################	
Displays Subject Marks for students 
and also for teachers For teachers it
 will be a little more sophisticated
##################################*/
function Scores({role, username,dataToDisplay}){
	const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
	const BASE_URL = "http://127.0.0.1:8000/"
	const REQUEST_URL = "auth/Marks/"


	const [fullUrl, setFullUrl] = useState(null)
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)
	

	/*##################################	
	This editMode variable is for the
	 teacher only
	##################################*/
	const [editMode, setEditMode] = useState(false)

	useEffect(()=>{

		setFullUrl(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
		console.log(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
	},
	[editMode]
	)
	

	function handleEditMode(){
		/*##################################	
		handleEditMode makes the table to 
		rerender it self as an editable mode
		this feature is for role=teachers
		##################################*/
		setEditMode(!editMode)
		if (editMode){
			console.log('Saved')
		}
	}

	if (response){
		console.log(response)
		/*##################################	
		When there is response we check the 
		role and then render the table!
		StudentMark table is this straight-forward
		response looks like:
		[{dictkeys},{dictkeys},{...},{...},...]
		##################################*/
		if (role === 'student'){
			return (<Table dataToDisplay={response} role={role}/>)
		}
		
		else if (role === 'teacher'){
			return (
				<>
				<form action={console.log('saved')}>
				<div className="d-flex justify-content-end m-1">
					<button type='button' className="btn bg-transparent m-2">Refresh</button>
					<button type={'button'} className="btn btn-primary m-2" 
							onClick={handleEditMode}>{editMode ? 'Save':'Edit'}</button>
				</div>
				<Table dataToDisplay={response} role={role} editMode={editMode}/>
				</form>	
				</>
				)
		}
	}
	 
}

/*##################################	
This component returns the account
detais; and can update the database
with the changed data
##################################*/

function Account({profileData, role }){
	console.log(profileData)
	return (<>
		<form className="m-4 d-flex gap-2 flex-wrap" action="">
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Profile</h5>
				<label>First Name<input type="text" defaultValue={profileData.firstname}/></label>
				<label>Last Name<input type="text" defaultValue={profileData.lastname}/></label>
			</div>
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Credentials</h5>
				<label>Username:<input type="text" defaultValue={profileData.username}/></label>
				<label>Password:<input type="button" defaultValue={"Changed Password"}/></label>
			</div>
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Enrollement</h5>
				<label><input type="text"/></label>
				<label><input type="text"/></label>
			</div>
		
		</form>

		</>)
}



function Help(){
	return (<h1>My HElp</h1>)

}

/*##################################	
Some Preconfigured Tools to render
the contents:
it can easily be 'reconfigured'
##################################*/

function Table({dataToDisplay, role, editMode=false}){
	let  editableCells = []
	let isForm = false
	let tableHeader = []
	let fields = []

	if (role==='teacher'){
		console.log('tede')
		editableCells = [false, false, true]
		isForm = true
		tableHeader = ['Student name','Grade','Mark']
		fields = ['student_name', 'grade_letter',  'mark']
	}
	else if (role==='student'){
		console.log(dataToDisplay)
		editableCells = [false, false, false]
		isForm = false
		tableHeader = ['Subject','Grade','Mark']
		fields = ['subject_name', 'grade_letter',  'mark']
	}
	
	return (
		<table className="table table-striped table-bordered table-hover flex-wrap container-md m-4">
		<thead>
			<tr>
				{
					tableHeader.map((text)=>
					(<th>{text}</th>)
					)
				}
			</tr>
		</thead>
		<tbody>{
		dataToDisplay.map((row, index)=>{
			const y = index
			return (<tr>{
			fields.map((cell, index)=>
				
				(<th className="font-monospace">
				{editableCells[index] ? <input 
					name={`${cell}-${index}`} 
					className="bg-transparent border-0 w-auto "
					type="number" 
					defaultValue={row[cell]}
					readOnly={!editMode}/>
							:
					row[cell]
				}
				</th>
				)
			)
			}</tr>
			)
		}
		)
		}
		</tbody>
		</table>

)
}



