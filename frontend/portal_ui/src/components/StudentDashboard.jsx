import { useEffect, useState } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_scores/"

function StudentDashboard({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	useEffect(()=>{
		const params = new URLSearchParams({
			username,
			token,
			role:'student'
		})
		setFullUrl(BASE_URL + REQUEST_URL +'?'+ params.toString())
		console.log(BASE_URL + REQUEST_URL +'?'+ params.toString())
	}
	)
	
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)
	
	if (response){
		console.log(response)
		// const response = response.map(({subject_name, mark, date_recorded})=>({subject_name, mark, date_recorded, }))
		// console.log(scores)
		return (<div className="container-md flex-wrap">
			<h1>Scores</h1>
			<table className="table table-striped table-bordered table-hover flex-wrap" >
				<thead className="table-dark">
					<tr>
					<th>Subject</th>
					{response.map((subject)=>(<th>{subject.subject_name}</th>))}
					</tr>
				</thead>
				<tbody>
					<tr>
					<th>Score</th>
					{response.map((subject)=>(<th>{subject.mark}</th>))}
					</tr>
					<tr>
					<th>Grade</th>
					{response.map((subject)=>(<th>{subject.grade_letter}</th>))}
					</tr>
					<tr>
					<th>Recorded</th>
					{response.map((subject)=>(<th><em className="text-muted text-opacity-50 text">{subject.date_recorded}</em></th>))}
					</tr>
				</tbody>
			</table>
		</div>)
	}

	if (isValidating) {return (<div className="spinner-border">
		<span className="visually-hidden">Loading...</span>
	</div>)}
}
export default StudentDashboard;