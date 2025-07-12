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
		const scores = response
		return (<div className="container-md">
			<table className="table table-striped table-bordered table-hover" >
				<thead className="table-dark">
					<tr>
					<th>Subject</th>
					{scores.map((asubject)=>(<th>{asubject.subject_name}</th>))}
					</tr>
				</thead>
				<tbody>
					<tr>
					<th>Score</th>
					{scores.map((asubject)=>(<th>{asubject.mark}</th>))}
					</tr>
					<tr>
					<th>Date Recorded</th>
					{scores.map((asubject)=>(<th>{asubject.date_recorded}</th>))}
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