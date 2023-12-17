import executeQuery from "../../../../util/data/database";

var cache = {};

export default async function Memes(req, res) {
    try {
        if (!req.query.first || !req.query.length) {
            res.status(400).json([]);
            return;
        }

        var length;

        try {
            length = parseInt(req.query.length);
        } catch (err) {
            res.status(400).json([]);
            return;
        }

        if (length <= 0 || length > 11) {
            res.status(400).json([]);
            return;
        }

        var first;

        try {
            first = parseInt(req.query.first);
        } catch (err) {
            res.status(400).json([]);
            return;
        }

        if (first < 0) {
            res.status(400).json([]);
            return;
        }

        var query = "";
        var values = [];

        if (!req.query.query) {
            query = "SELECT * FROM Memes LIMIT ?, ?;";
        } else {
            var words = req.query.query.split(" ");

            var wordsCondition = "";

            for (var i = 0; i < words.length; i++) {
                if (!words[i].includes("\"") && !words[i].includes("'") && !words[i].includes("[") && !words[i].includes("]") && words[i].length > 0) {
                    if (i == 0) {
                        wordsCondition += "tags LIKE ?";
                        values.push("%" + words[i] + "%");
                    } else {
                        wordsCondition += " AND tags LIKE ?";
                        values.push("%" + words[i] + "%");
                    }
                }

                if (wordsCondition.length > 0) {
                    query = "SELECT * FROM Memes WHERE " + wordsCondition + " LIMIT ?, ?;";
                } else {
                    query = "SELECT * FROM Memes LIMIT ?, ?;";
                }
            }
        }

        values.push(first);
        values.push(length);

        var rows;
        var fields;

        if (!cache[query + values]) {
            [rows, fields] = await executeQuery(query, values);
        } else if (Date.now() - cache[query + values].time > 300000) {
            [rows, fields] = await executeQuery(query, values);
        } else {
            rows = cache[query + values].data;
        }

        cache[query + values] = { "data": rows, "time": Date.now() };

        res.status(200).json({ success: true, result: rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "A server error occurred :(" });
    }
}
