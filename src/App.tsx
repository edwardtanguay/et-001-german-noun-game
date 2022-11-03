import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import * as tools from './tools';

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
			let _nouns = (await axios.get(url)).data;
			_nouns = tools.randomize(_nouns);
			setNouns(_nouns);
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
							<div className="front">
								{noun.singular}
							</div>
							<div className="back">
								<div className="singular">{noun.article} {noun.singular}</div>
								<div className="plural">{noun.plural}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
