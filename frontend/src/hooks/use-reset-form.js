import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();
    
	useEffect(() => {
		let currentWasLogout = store.getState().app.prevWasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (previousWasLogout !== currentWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
