import { useState } from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res)=>res.json())

function Entry({logOut, userName, token,}){

	return (<>
		<div className="Entry ">
			<nav>
				<div>
					<div>
			 			<p>Student: Student Name<br/>Grade: Grade Status</p>
		 			</div>
				</div>
				<div>
					<button className="btn btn-primary" onClick={logOut}>Logout</button>
				</div>
			</nav>

		 	<div className="header fw-bolder">
		 		<div></div>
		 	</div>
		 	<div className="body">
		 		<div className="panel-left shadow-lg ">
		 			<a className="bg-gradient">Grading</a>
		 			<a className="bg-gradient">Grade Change Requests</a>
		 			<a className="bg-gradient">-----------</a>
		 			<a className="bg-gradient">-----------</a>
		 		</div>
		 		<div className="panel-right">
		 			Panel-right
		 		</div>
		 	</div>
		 </div> 
	</>)
}

export default Entry;