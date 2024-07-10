const generarId = () => {
    const random=Math.random().toString(32).substring(2);
    return Date.now().toString(32) + random
}

export default generarId