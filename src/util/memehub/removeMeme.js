import executeQuery from "../data/database";

export default function removeMeme(id) {
    console.log("Removing video with ID " + id);
    executeQuery("DELETE FROM Memes WHERE urlId = ?", [id]);
}
