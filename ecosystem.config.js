//PM2 config
module.exports = {
    apps: [
        {
            name: "bitly",
            script: "server",
            env: {
                "NODE_ENV": "production",
                "PORT": 81,
            }
        }
    ]
}