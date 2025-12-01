//1. createElemWithText
function createElemWithText (elemType = "p", textContent = "", className) {
    const myElem = document.createElement(elemType);
    myElem.textContent = textContent;
    if (className) {
        myElem.classList.add(className);
    }
    return myElem;
}

//2. createSelectOptions
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

//3. toggleCommentSection
function toggleCommentSection (postId) {
   const section = document.querySelector(`section[data-post-id="${postId}"]`);
   if (section){
    section.classList.toggle(`hide`);
   } else if (!postId) {
    return;
   } else {
    return null;
   }
   //section.classList.toggle(`hide`);
   return section;
}

//4. toggleCommentButton
function toggleCommentButton (postId) {
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    if (!postId) {
        return;
    } else if (button) {
    button.textContent = button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";
    } else {
        return null;
    }
    return button;
}

//5. deleteChildElements
function deleteChildElements (parentElement) {
    if(!parentElement) {
        return;
    }
    let child = parentElement.lastElementChild;

    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}

//6. addButtonListeners
function addButtonListeners () {

}

//7. removeButtoneListeners
function removeButtonListeners () {

}

//8. createComments
function createComments () {

}

//9. populateSelectMenu
function populateSelectMenu () {

}

//10. getUsers
async function getUsers (userData) {
    try{
        const respond = await fetch("https://jsonplaceholder.typicode.com/users");
        const jsonUserData = await respond.json();
        return jsonUserData;
    } catch (e) {
        console.log("There has been an error retrieving users.");
    }
}

//11. getUserPosts
async function getUserPosts (userId) {
    if (!userId) return;
    try{
        const respond = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return await respond.json();
    } catch (e) {
        console.log("There has been an error retrieving posts.");
    }
}

//12. getUser
async function getUser (userId) {
    if (!userId) return;
    try{
        const respond = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return await respond.json();
    } catch (e) {
        console.log("There has been an error retrieving user information.");
    }
}

//13. getPostComments
async function getPostComments (postId) {
    if (!postId) return;
    try{
        const respond = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return await respond.json();
    } catch (e) {
        console.log("There has been an error retrieving comments.");
    }
}

//14. displayComments
async function displayComments (postId) {
    
}