import executeQuery from "../../../../util/data/database";
import checkMeme from "../../../../util/memehub/checkMeme";
import removeMeme from "../../../../util/memehub/removeMeme";

var cacheRows = {};

var lastCheckTime = Date.now();

export default async function Random(req, res) {
    try {
        var rows;
        var fields;

        if (!req.query.id) {
            res.status(400).json({ success: false, message: "No ID provided." })
            return;
        }

        if (!cacheRows[req.query.id]) {
            [rows, fields] = await executeQuery("SELECT * FROM Memes WHERE urlId = ? LIMIT 1;", req.query.id);

            if (rows.length > 0) {
                cacheRows[req.query.id] = rows;
            } else {
                res.status(404).json({ success: false, message: "Meme not found." })
                return;
            }
        } else {
            rows = cacheRows[req.query.id];
        }

        var info = rows[0];

        var checking = (Date.now() - lastCheckTime) > 3000;
        if (checking) {
            lastCheckTime = Date.now();
        }

        var valid = await checkMeme(info.urlId, checking);
        if (!valid) {
            removeMeme(info.urlId);
            res.status(520).json({ success: false, message: "Meme was taken down after being submitted." });
            return;
        }

        const response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + req.query.id);
        const responseJSON = await response.json();

        for (var i in responseJSON) {
            info[i] = responseJSON[i];
        }

        res.status(200).json({ success: true, meme: info });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "A server error occurred :(" });
    }
}
