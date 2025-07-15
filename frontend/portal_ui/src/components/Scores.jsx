function Scores({response}){
	return (<div>
			<h1>Scores</h1>
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
					response.map((entry)=>{ 
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

export default Scores;