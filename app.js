/** @format */

const url = "https://api.github.com/users";
const searchInputElement = document.getElementById("searchInput");
const searchInputButton = document.getElementById("searchBtn");
const profileContainerElement = document.getElementById("profileContainer");
const loadingElement = document.getElementById("loading");

const generateProfile = (profile) => {
    return `<div class='profile_box'>
        <div class='top_section'>
            <div class='left'>
                <div class='avatar'>
                    <img src='${profile.avatar_url}' alt='avatar' />
                </div>
                <div class='self'>
                    <h1>${profile.name}</h1>
                    <h1>${profile.login}</h1>
                </div>
            </div>
            <a href='${profile.html_url}' target='_blank'> 
                <button class='primary_btn'>Check Profile</button>
            </a>
        </div>

        <div class='about'>
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>

        <div class='status'>
            <div class='status_item'>
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>

            <div class='status_item'>
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>

            <div class='status_item'>
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>`;
};

const fetchProfile = async () => {
    const username = searchInputElement.value;

    loadingElement.innerText = "Loading...";
    loadingElement.style.color = "black";

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if (data.created_at) {
            loadingElement.innerText = "";
            profileContainerElement.innerHTML = generateProfile(data);
        } else {
            loadingElement.innerText = data.message;
            loadingElement.style.color = "red";
            profileContainerElement.innerText = "";
        }

        console.log(data);
    } catch (error) {
        profileContainerElement.innerHTML = error;
    }
};

searchInputButton.addEventListener("click", fetchProfile);
