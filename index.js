// const yt = require('yt-live-url');
const { exec } = require('child_process');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 8080

// viewed at http://localhost:8080
app.get('/api', (req, res) => {


    const { youtubeId } = req.query;

    const publicPath = `/images/${youtubeId}-${Date.now()}.jpg`
    const fullPath = path.join(__dirname, "/public/", publicPath)

    exec(`ffmpeg -i "$(yt-dlp -g ${youtubeId} | head -n 1)" -vframes 1 ${fullPath}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        res.send(JSON.stringify({ screenshot: publicPath }))
    });



});

//Serving static files from "public" folder using express "static" function
app.use(express.static('public'));

//Server PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




