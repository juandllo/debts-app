const useMaskCurrency = () => {
	const setMask = (value) => { return `$ ${value.toLocaleString('es-ES')}` }
	return { setMask }
}

export { useMaskCurrency }