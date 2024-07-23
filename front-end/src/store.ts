


export function setLoggedInUser(id){
    localStorage.setItem('loggedInUserID', id);
}

export function getLoggedInUser(){
    const id = localStorage.getItem('loggedInUserID');
    if (id) {
        return id;
    }
    return null;
}


