export default function debounce(fn, delay) {
	let timer;
	return function (...arg) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...arg);
		}, delay);
	};
}
