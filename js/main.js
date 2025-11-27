function createElemWithText (elemType = "p", textContent = "", className) {
    const myElem = document.createElement(elemType);
    myElem.textContent = textContent;
    if (className) {
        myElem.classList.add(className);
    }
    return myElem;
}

function createSelectOptions (userData) {
    const userArray = [];
    if (!userData) return;
    userData.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userArray.push(option);
    });
    return userArray;
}

function toggleCommentSection (postId) {
    
}