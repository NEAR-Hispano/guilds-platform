
export const setJoinMsg = (guildsUser, slug) => {
    let message = '';
    if(!guildsUser){
        message = 'Validating...';
    } else if(guildsUser.includes(slug)){
        message = 'JOINED';
    } else {
        message = 'JOIN US';
    }
    return message; 
}