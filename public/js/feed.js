document.addEventListener('DOMContentLoaded', function (event) {
    const feed = document.getElementById("feed");

    //GET FEED
    fetch(tweetsAPI, {
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
            res.reverse();
            for (data of res) addToFeed(feed, data);

            const spinner = document.getElementById("spinner");
            spinner.style.visibility = 'hidden';
            //userProfiles();
        })

})

function addToFeed(feed, data) {
    let profile = document.createElement("h4");
    profile.appendChild(document.createTextNode(data.userNum));
    profile.href = data.user;

    let text = document.createElement("p");
    text.appendChild(document.createTextNode(data.text));

    let date = document.createElement("p");
    date.appendChild(document.createTextNode(data.date));
    date.style = "float: right;";

    let tweet = document.createElement("div");
    tweet.className = "frame";
    tweet.appendChild(profile);
    tweet.appendChild(text);
    tweet.appendChild(date);

    feed.appendChild(tweet);
}