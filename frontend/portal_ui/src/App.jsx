import Entry from './Entry'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'

function App(){

	return(
		<>
			{/*<h1 class="">This is the portal for Teachers and Students </h1>
			<p>Please sign-in: if you're a teacher it takes you to the teacher's portal and if you're a student it takes you to the students portal</p>
			<SignBox />*/}

			<Entry />
		</>
		)
}

export default App;