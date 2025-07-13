import { useEffect, useState } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_students/"

function TeacherDashboard({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	useEffect(()=>{
		const params = new URLSearchParams({
			username,
			token,
			role:'teacher',
		})
		setFullUrl(BASE_URL + REQUEST_URL +'?'+ params.toString())
		console.log(BASE_URL + REQUEST_URL +'?'+ params.toString())
	}
	)
	
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)
	const fed = {'gff':null, 'giff':null, 'gasf':null, 'gwa':null, }

	if (response){
		console.log(response)
		const marks = [...response[0], ...response[1]]
		console.log(marks)
		const subjects = Object.keys(response)
		const students = response[subjects[0]].map((one)=>(one.student_name))
		return (<div className="container-md flex-wrap">
			<h1>Scores</h1>
			<table className="table table-striped table-bordered table-hover flex-wrap" >
				<thead className="table-dark">
					<tr>
					<th>Student</th>
					{response.map((list)=>(<th>{list[0].subject_name}</th>))}
					</tr>
				</thead>
				<tbody>
					{ students.map((student) =>{
						const student_marks = marks.filter((mark)=>(mark.student_name === student))
						return (
							<tr>
								<th>{student}</th>
								{
								student_marks.map((studentMark) => (<th>{studentMark.mark}</th> ))
								}
							</tr>
						)
						}
					
					)
				}

					 {/*
					<tr>
					<th>Grade</th>
					{response.map((subject)=>(<th>{subject.grade_letter}</th>))}
					</tr>
					<tr>
					<th>Recorded</th>
					{response.map((subject)=>(<th>{subject.date_recorded}</th>))}
					</tr>
					*/}
				</tbody>
			</table>
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