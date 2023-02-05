const useMaskDate = () => {
	const setMaskDate = (value) => { return value.split('T').shift() }
	return { setMaskDate }
}

export { useMaskDate }