import { useEffect, useState, useRef } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_students/"

let oldData = {}

function TeacherDashboard({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	const [editMode, setEditMode] = useState(false)  // to set edit mode.
	const formRef = useRef(null)

	useEffect(()=>{
		const params = new URLSearchParams({
			username,
			token,
			role:'teacher',
		})
		setFullUrl(BASE_URL + REQUEST_URL +'?'+ params.toString())
	}
	)


	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher,{revalidateOnFocus:false, revalidateOnReconnect:false})

	if (response){
		// Code explanation for this 
		// i either need to simplify the response from backend or heavily comment this block!! It's approaches machine code -LOL!!
		// response returns an array that looks like [[subjects_meta_data_as_a_dictionaries],[entries_that_are_for_each_student-subject_pairs so if there are two subjects and 20 students their are 80 entries]]

		const subjects = response[0]['subjects']
		let students = new Set()
		response[1].map((entry)=>{
			students.add(entry.student_name)
		})
		students = Array.from(students).sort()
		// console.log(students)
		// console.log(subjects)

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
			console.log(getChangedFields(oldData, newData))
			oldData = newData // update the old data for future reference
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
			
				<table id="table" className="table table-striped table-bordered table-hover flex-wrap" >
					<thead className="table-dark">
						<tr>
						<th>Student</th>
						{subjects.map((subject)=>(<th>{subject.name}</th>))}
						</tr>
					</thead>
					<tbody>
						{ Array.from(students).map((student) =>{
							const student_marks = response[1].filter((entry)=>(entry.student_name === student))

							return (
								<tr>
									<th>{student}</th>
									{
									student_marks.map((studentMark) => 
										(<th>
											<input name={student+':'+studentMark.subject_name} className="text-black border-0 bg-transparent w-auto" type="text" defaultValue={studentMark.mark} readOnly={!editMode}/>
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