import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

interface INoun {
	article: string;
	singular: string;
	plural: string;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

	useEffect(() => {
		(async () => {
			setNouns((await axios.get(url)).data);
		})();
	}, []);

	return (
		<div className="App">
			<h1>German Noun Game</h1>
			<h2>There are {nouns.length} nouns:</h2>
			<div className="nouns">
				{nouns.map((noun) => {
					return (
						<div className="noun" key={noun.singular}>
							<div className="singular">
								{noun.article} {noun.singular}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
