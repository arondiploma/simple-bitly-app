//PM2 config
module.exports = {
    apps: [
        {
            name: "bitly",
            script: "npm start",
            env: {
                "NODE_ENV": "production",
                "PORT": 81,
            }
        }
    ]
}