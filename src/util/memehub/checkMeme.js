import executeQuery from "../data/database";
import getMemeTags from "./memeTags";

export default async function checkMeme(id, refreshTags=false) {
    return new Promise(async function(resolve) {
        const response = await fetch("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + process.env.YT_API_KEY + "&part=snippet,contentDetails,status");
        const json = await response.json();

        if (json.items.length <= 0) {
            resolve(false);
            return;
        }

        var embeddable = json.items[0].status.embeddable;

        if (!embeddable) {
            resolve(false);
            return;
        }

        var ageRestricted = json.items[0].contentDetails.contentRating.ytRating == "ytAgeRestricted";

        if (ageRestricted) {
            resolve(false);
            return;
        }

        if (refreshTags) {
            refreshMemeTags(id);
        }
        resolve(true);
        return;
    });
}

async function refreshMemeTags(id) {
    var ytApiResponse = await fetch("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + process.env.YT_API_KEY + "&part=snippet");
    var ytApiResponseJSON = await ytApiResponse.json();

    var tags = getMemeTags(ytApiResponseJSON);

    await executeQuery("UPDATE Memes SET tags = ? WHERE urlId = ?;", [JSON.stringify(tags), id]);
}
