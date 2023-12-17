import executeQuery from "../../../../util/data/database";
import getMemeTags from "../../../../util/memehub/memeTags";

export default async function Submit(req, res) {
    try {
        var regex = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube(-nocookie)?\.com|youtu.be))?(\/(?:[\w\-]+\?v=|embed\/|v\/|shorts\/)?)?(?<videoId>[\w\-]{11})(\S+)?$/gm;
        regex.lastIndex = 0;

        if (!req.query.id) {
            res.status(400).json({ success: false, message: "No ID provided." });
            return;
        }

        var text = req.query.id;

        var regexResult = regex.exec(text);

        if (!regexResult) {
            res.status(400).json({ success: false, message: "Bad URL." });
            return;
        }

        if (!regexResult.groups) {
            res.status(400).json({ success: false, message: "Bad URL." });
            return;
        }

        if (!regexResult.groups.videoId) {
            res.status(400).json({ success: false, message: "Bad URL." });
            return;
        }

        var [memesRows, memesFields] = await executeQuery("SELECT * FROM Memes WHERE urlId = ? LIMIT 1;", regexResult.groups.videoId);

        if (memesRows.length > 0) {
            res.status(400).json({ success: false, message: "Meme already submitted!" });
            return;
        }

        var response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + regexResult.groups.videoId + "&format=json");

        if (response.status != 200) {
            res.status(404).json({ success: false, message: "Video not found." });
            return;
        }

        var ytApiResponse = await fetch("https://www.googleapis.com/youtube/v3/videos?id=" + regexResult.groups.videoId + "&key=" + process.env.YT_API_KEY + "&part=snippet");
        var ytApiResponseJSON = await ytApiResponse.json();

        var tags = getMemeTags(ytApiResponseJSON);

        await executeQuery("INSERT INTO Memes (urlId, tags) VALUES (?, ?);", [regexResult.groups.videoId, JSON.stringify(tags)]);

        res.status(200).json({ success: true, message: "Submitted meme!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "A server error occurred :(" });
    }
}
