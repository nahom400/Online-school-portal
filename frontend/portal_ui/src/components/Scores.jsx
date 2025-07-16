import { useState, useEffect } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/Marks/"

function Scores({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)

	useEffect(()=>{
		const role = 'student'
		setFullUrl(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
		console.log(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
	}
	)

	if (isValidating) {
		return (
			<div className="spinner-border">
				<span className="visually-hidden">Loading...</span>
			</div>
			)
		}

	if (response){ return (<div>
			<h1>Scores</h1>
			<p>Scores for {response.count} subject(s)</p>
			<table className="table table-striped table-bordered table-hover flex-wrap" >
				<thead className="table-dark">
					<tr>
						<th>Subject</th>
						<th>Score</th>
						<th>Grade</th>
						<th>Recorded</th>
					</tr>
				</thead>
			<tbody>
				{ 
					response.results.map((entry)=>{ 
					const keys = ['subject_name','mark','grade_letter','date_recorded']
				return (<tr>
					{keys.map((key)=>(<td>{entry[key]}</td>))}
					</tr>)
					})			
				}
			</tbody>
			</table>
		</div>)
	}
}

export default Scores;