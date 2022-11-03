import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import * as tools from './tools';

const url = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

interface INoun {
	article: string;
	singular: string;
	plural: string;
	isOpen: boolean;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

	useEffect(() => {
		(async () => {
			let rawNouns = (await axios.get(url)).data;
			rawNouns = tools.randomize(rawNouns);
			const _nouns: INoun[] = [];
			rawNouns.forEach((rawNoun: any) => {
				const _noun: INoun = {
					...rawNoun,
					isOpen: false,
				};
				_nouns.push(_noun);
			});
			console.log(_nouns);
			setNouns(_nouns);
		})();
	}, []);

	const handleFlashcardClick = (noun: INoun) => {
		noun.isOpen = !noun.isOpen;
		setNouns([...nouns]);
	}

	return (
		<div className="App">
			<h1>German Noun Game</h1>
			<h2>There are {nouns.length} nouns:</h2>
			<div className="nouns">
				{nouns.map((noun) => {
					return (
						<div className="noun" key={noun.singular}>
							<div className="front" onClick={() => handleFlashcardClick(noun)}>{noun.singular}</div>
							{noun.isOpen && (
								<div className="back">
									<div className="singular">
										{noun.article} {noun.singular}
									</div>
									<div className="plural">{noun.plural}</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
