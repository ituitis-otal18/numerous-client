function postTweet() {
    const content = document.getElementById("postForm").elements[0].value;

    //POST TWEET
    fetch(tweetsAPI, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": userID,
                "number": userNumber,
                "text": content
            })
        })
        .then(data => {
            console.log(data);
            if (data.ok) window.location.reload(true);
            else alert("An error occurred!");
        })
}