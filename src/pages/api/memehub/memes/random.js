import executeQuery from "../../../../util/data/database";
import checkMeme from "../../../../util/memehub/checkMeme";
import removeMeme from "../../../../util/memehub/removeMeme";

var lastCacheTime = 0;
var cacheRows;
var cacheFields

export default async function Random(req, res) {
    try {
        var rows;
        var fields;

        var cached = (Date.now() - lastCacheTime <= 3000);

        if (!cached) {
            [rows, fields] = await executeQuery("SELECT * FROM Memes ORDER BY RAND() LIMIT 1;");
            cacheRows = rows;
            cacheFields = fields;

            lastCacheTime = Date.now();
        } else {
            [rows, fields] = [cacheRows, cacheFields];
        }

        var info = rows[0];

        if (!cached) {
            var valid = await checkMeme(info.urlId, true);
            if (!valid) {
                removeMeme(info.urlId);
                res.status(520).json({ success: false, message: "Meme was taken down after being submitted." });
                return;
            }
        }

        const response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + info.urlId);
        const responseJSON = await response.json();

        for (var i in responseJSON) {
            info[i] = responseJSON[i];
        }

        res.status(200).json({ success: true, meme: info });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "A server error occurred :(" });
    }
}
