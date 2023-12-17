const filterAccept = "abcdefghijklmnopqrstuvwxyz1234567890";

function filter(word) {
    var newWord = "";

    for (var i = 0; i < word.length; i++) {
        if (filterAccept.includes(word[i])) {
            newWord += word[i];
        }
    }

    return newWord;
}

export default function getMemeTags(ytApiResponseJSON) {
    var existingTags = ytApiResponseJSON.items[0].snippet.tags;
    var tagsList = [];

    if (existingTags) {
        tagsList = existingTags;
    }

    var words = ytApiResponseJSON.items[0].snippet.title + " " + ytApiResponseJSON.items[0].snippet.channelTitle + " " + tagsList.join(" ");
    words = words.toLowerCase().split(" ");

    var tags = [];

    for (var i = 0; i < words.length; i++) {
        if (tags.length < 100 && JSON.stringify(tags).length < 100) {
            var word = filter(words[i]);
            if (!tags.includes(word) && word.length > 0 && word.length <= 10) {
                tags.push(word);
            }
        } else {
            break;
        }
    }

    return tags;
}
