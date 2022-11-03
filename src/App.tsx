import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import * as tools from './tools';

const url = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

interface INoun {
	article: string;
	singular: string;
	plural: string;
	isOpen: boolean;
	isLearned: boolean;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

	useEffect(() => {
		(async () => {
			let _nouns: INoun[] = [];
			const localStorageString = localStorage.getItem(
				'german-noun-game-state'
			);
			if (localStorageString !== null) {
				_nouns = JSON.parse(localStorageString);
			} else {
				let rawNouns = [];
				rawNouns = (await axios.get(url)).data;
				rawNouns = tools.randomize(rawNouns);
				rawNouns.forEach((rawNoun: any) => {
					const _noun: INoun = {
						...rawNoun,
						isOpen: false,
						isLearned: false,
					};
					_nouns.push(_noun);
				});
			}
			setNouns(_nouns);
		})();
	}, []);

	const saveNouns = () => {
		setNouns([...nouns]);
		localStorage.setItem('german-noun-game-state', JSON.stringify(nouns));
	};

	const handleFlashcardClick = (noun: INoun) => {
		noun.isOpen = !noun.isOpen;
		saveNouns();
	};

	const handleMarkAsLearned = (noun: INoun) => {
		noun.isLearned = !noun.isLearned;
		saveNouns();
	};

	const handleResetGameButton = () => {
		localStorage.removeItem('german-noun-game-state');
		window.location.reload();
	};

	return (
		<div className="App">
			<h1>German Noun Game</h1>
			<h2>
				You have learned{' '}
				{nouns.reduce(
					(total, noun) => total + (noun.isLearned ? 1 : 0),
					0
				)}{' '}
				of {nouns.length} nouns.{' '}
				<button onClick={handleResetGameButton}>Reset game</button>
			</h2>
			<div className="nouns">
				{nouns.map((noun) => {
					return (
						<React.Fragment key={noun.singular}>
							{!noun.isLearned && (
								<div className="noun">
									<div
										className="front"
										onClick={() =>
											handleFlashcardClick(noun)
										}
									>
										{noun.singular}
									</div>
									{noun.isOpen && (
										<div className="back">
											<div className="singular">
												{noun.article} {noun.singular}
											</div>
											<div className="plural">
												{noun.plural}
											</div>
											<button
												onClick={() =>
													handleMarkAsLearned(noun)
												}
											>
												Mark as learned
											</button>
										</div>
									)}
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}

export default App;
