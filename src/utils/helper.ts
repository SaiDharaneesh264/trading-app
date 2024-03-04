const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return true;
    }
    const expiryTime = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000)
    return new Date() > expiryTime;
}

const clearToken = () => {
    localStorage.removeItem('token')
}


