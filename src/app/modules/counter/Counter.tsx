import { JSX, useEffect, useState } from 'react';

export default function Counter(): JSX.Element {
	const { count, increment }: { count: number; increment: () => void } = useCounter();

	return (
		<div>
			<h1>Hello, World</h1>
			<section>
				<button onClick={increment}>Counter: {count}</button>
			</section>
			<small className='powered-by'>
				Powered by <a href='https://roboplay.dev/docs'>Robo.js</a>
			</small>
		</div>
	);
}

// Simple custom hook to use included APIs for demo purposes
function useCounter(): { count: number; increment: () => void } {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		const run = async (): Promise<void> => {
			const response: Response = await fetch('/api/get-count');
			const data: { count: number } = await response.json();
			setCount(data.count);
		};
		run();
	}, []);

	const increment = async (): Promise<void> => {
		const response: Response = await fetch('/api/set-count');
		const data: { count: number } = await response.json();
		setCount(data.count);
	};

	return { count, increment };
}
