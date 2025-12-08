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
    if (!parentElement || !(parentElement instanceof HTMLElement)) {
        return undefined;
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
    const buttons = document.querySelectorAll(`main button`);
    if (buttons.length > 0) {
        buttons.forEach(button => {
            const postId = button.dataset.postId;
            if (postId) {
                button.addEventListener("click", function (e) {
                    toggleComments(e, postId);
                });
            }
        });
    }
    return buttons;
}

//7. removeButtonListeners
function removeButtonListeners () {
    const buttons = document.querySelectorAll(`main button`);
    if (!buttons) return;
    buttons.forEach(button => {
        const postId = button.dataset.postId;
        if (postId) {
            button.removeEventListener("click", function (e) {
                toggleComments(e, postId);

            });
        }
    });
    return buttons;
}

//8. createComments
function createComments (jsonComments) {
    if (!jsonComments) return;
    const frag = document.createDocumentFragment();
    jsonComments.forEach(comment => {
        const article = document.createElement("article");
        const h3 = createElemWithText(`h3`, comment.name);
        const body = createElemWithText(`p`, comment.body);
        const email = createElemWithText('p', `From: ${comment.email}`);

        article.append(h3, body, email);
        frag.append(article);
    })
    return frag;
}

//9. populateSelectMenu
function populateSelectMenu (jsonUsers) {
    if (!jsonUsers) return;
    const menu = document.getElementById("selectMenu");
    const users = createSelectOptions(jsonUsers);
    users.forEach(user => {
        menu.append(user);
    })
    return menu;
}

//10. getUsers
async function getUsers () {
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
    if (!postId) return;
    const section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add(`comments`);
    section.classList.add(`hide`);
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    return section;
}

//15. createPosts
async function createPosts (postId) {
    if (!postId) return;
    const frag = document.createDocumentFragment();
    for (const post of postId){
        const article = document.createElement(`article`);
        const ptitle = createElemWithText(`h2`, post.title);
        const pbody = createElemWithText(`p`, post.body);
        const id = createElemWithText(`p`, `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const authPost = createElemWithText(`p`, `Author: ${author.name} with ${author.company.name}`);
        const compPhrase = createElemWithText(`p`, author.company.catchPhrase);
        const button = document.createElement(`button`);
        button.textContent = `Show Comments`;
        button.dataset.postId = post.id;
        const section = await displayComments(post.id);
        article.append(ptitle, pbody, id, authPost, compPhrase, button, section);
        frag.append(article);
    }
    //frag.append(article);
    return frag;

}

//16. displayPosts
async function displayPosts (posts) {
    const main = document.querySelector("main");
    const element = posts ? await createPosts(posts): createElemWithText("p", "Select an Employee to display their posts.", "default-text");
    main.append(element);
    return element;

}

//17 toggleComments
function toggleComments (e, postId) {
    if(!postId) return;
    e.target.listener = true;
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return [section, button];
}

//18 refreshPosts
async function refreshPosts (posts) {
    if (!posts) return;
    const removeButtons = removeButtonListeners();
    const main = document.querySelector("main");
    const mainElement = deleteChildElements(main);
    const frag = await displayPosts(posts);
    const addButtons = addButtonListeners();
    
    return [removeButtons, mainElement, frag, addButtons];

}

//19 selectMenuChangeEventHandler
async function selectMenuChangeEventHandler (e) {
    if (!e) return;
    e.disabled = true;
    const userId = parseInt(e?.target?.value) || 1;
    console.log(userId);
    const posts = await getUserPosts(userId);
    const refresh = await refreshPosts(posts);
    e.disabled = false;
    return [userId, posts, refresh];
}

//20 initPage
async function initPage () {
    const users = await getUsers();
    const elem = populateSelectMenu(users);
    return [users, elem];
}

//21 initApp
async function initApp() {
    initPage();
    const select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);