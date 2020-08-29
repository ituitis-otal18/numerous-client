document.addEventListener('DOMContentLoaded', function (event) {

    const userTweets = document.getElementById("profile");

    //GET PROFILE
    fetch(usersAPI +"/"+ userID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(res => {
        let profile = document.createElement("h4");
        profile.appendChild(document.createTextNode(userNumber));
        userTweets.appendChild(profile);

        res.reverse();
        for (data of res) addToFeed(userTweets, data);

        const spinner = document.getElementById("spinner");
        spinner.style.visibility = 'hidden';
    })
})

function addToFeed(feed, data) {
    let text = document.createElement("p");
    text.appendChild(document.createTextNode(data.text));

    let date = document.createElement("p");
    date.appendChild(document.createTextNode(data.date));
    date.style = "float: right;";

    let tweet = document.createElement("div");
    tweet.className = "frame2";
    
    tweet.appendChild(text);
    tweet.appendChild(date);

    feed.appendChild(tweet);
}
/*
function userProfiles(){
    var profiles = document.getElementsByTagName('h4');
    if( profiles.length ){
        for(profile of profiles){
            profile.addEventListener('click',function(){ 
                alert(profile.href); 
            },false);
        }
    }
}
*/