import { useEffect, useState, useRef } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_students/"
const UPLOAD_URL = "auth/post_all/"

let oldData = {}

function TeacherDashboard({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	const [editMode, setEditMode] = useState(false)  // to set edit mode.
	const [postUrl, setPostUrl] = useState(null)
	const formRef = useRef(null)

	useEffect(()=>{
		const params = new URLSearchParams({
			username,
			token,
			role:'teacher',
			editMode
		})
		setFullUrl(BASE_URL + REQUEST_URL +'?'+ params.toString())
	},
	[editMode]
	)


	const {data : getResponse, isValidating, error} = useSWR(fullUrl, fetcher,{revalidateOnFocus:false, revalidateOnReconnect:false})
	const {data: postResponse, isValidating:saving, error:errorSaving} = useSWR(postUrl, fetcher,{revalidateOnFocus:false, revalidateOnReconnect:false})
	if (getResponse){
		// Code explanation for this 
		// i either need to simplify the getResponse from backend or heavily comment this block!! It's approaches machine code -LOL!!
		// getResponse returns an array that looks like [[subjects_meta_data_as_a_dictionaries],[entries_that_are_for_each_student-subject_pairs so if there are two subjects and 20 students their are 80 entries]]

		const subjects = getResponse[0]['subjects']
		let students = new Set()
		const allEntries = Object.entries(getResponse[1])

		allEntries.map((entry)=>{
			const student_name = entry[0].split(':')[0]
			students.add(student_name)
		})
		students = Array.from(students).sort()

		function getChangedFields(oldData, newData){
			const changed = {}
			const keys = Object.keys(newData)
			for (const index in keys){
				const name = keys[index]
				if (newData[name] !== oldData[name]){
					changed[name] = newData[name]
				}
			}
			return changed
		}
		function submit(formData){
			console.log("ACTED")
			const newData = Object.fromEntries(formData.entries())
			const changedData = (getChangedFields(oldData, newData))
			oldData = newData // update the old data for future reference
			const params = new URLSearchParams(
				changedData
				)
			setPostUrl(BASE_URL+UPLOAD_URL+'?'+params.toString())
		}

		function toggleEditMode(){
			if (formRef.current && !editMode){
				// collecting old data to compare and send only changed ones to server
				// use !editMode because it will not know the whether this is the saved one or not
				const formData = new FormData(formRef.current);
				const data = Object.fromEntries(formData.entries())
				oldData = data
			}
			(setEditMode((prev)=>{
				if (prev === true){
					console.log("acted")
				}	
				return !prev
			}))

		}
		function preventEnterKey(e){
			if (e.key === 'Enter'){
				e.preventDefault()
			}
		}
		return (<div className="container-md flex-wrap">
			<form action={submit} onKeyDown={preventEnterKey} ref={formRef}>
			<div className="title d-flex justify-content-between align-items-center">
				<h1>Scores</h1>
				<div className="d-flex gap-1 m-3">
					<input
						type={editMode ? "button":"submit"}
						className="btn btn-primary" 
						value={editMode ? "Save to DB" : "Edit"}
						onClick={toggleEditMode} />
					
					<button type="button" className="btn btn-primary">Refresh</button>
					{editMode ? <button className="btn btn-lg" aria-description="choose .xslx file">Link with a spreadsheet</button> : null}
				</div>
			</div>
			{/*Rendering starts here*/}
				<table id="table" className="table table-striped table-bordered table-hover flex-wrap" >
					<thead className="table-dark">
						<tr>
						<th>Student</th>
						{subjects.map((subject)=>(<th>{subject.name}</th>))}
						</tr>
					</thead>
					<tbody>
						{ students.map((student) =>{
							const studentEntries = allEntries.filter((entry)=>(entry[0].split(':')[0] === student))

							return (
								<tr>
									<th>{student}</th>
									{
									studentEntries.map((entry, index) => 
										(<th>
											<input name={entry[0]} className="text-black border-0 bg-transparent w-auto" type="text" defaultValue={entry[1]} readOnly={!editMode}/>
										</th> ))
									}
								</tr>
							)
							}
						
						)
					}
					</tbody>
				</table>
			</form>
			{ saving ? <div className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75' style={{'z-index':1050}}>
				<div className="spinner-border">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>:null
			}
		</div>)
	}

	if (isValidating) {
		return (
		<div className="spinner-border">
			<span className="visually-hidden">Loading...</span>
		</div>)
	}
}
export default TeacherDashboard;