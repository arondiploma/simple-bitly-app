const data = {
    withNewURL: (longUrl) => {
        return JSON.stringify({
            "status_code": 200,
            "status_txt": 'OK',
            "data":
            {
                "url": 'http://bit.ly/30atsq6',
                "hash": '30atsq6',
                "global_hash": '2tJWJdS',
                "long_url": longUrl,
                "new_hash": 1
            }
        });
    },
    withOldURL: (longUrl) => {
        return JSON.stringify({
            "status_code": 200,
            "status_txt": 'OK',
            "data":
            {
                "url": 'http://bit.ly/30atsq6',
                "hash": '30atsq6',
                "global_hash": '2tJWJdS',
                "long_url": longUrl,
                "new_hash": 0
            }
        });
    },
    withInvalidURL: () => {
        return JSON.stringify({
            "status_code": 500,
            "status_txt": "INVALID_URI",
            "data": []
        });
    },
    alreadyBitlink: () => {
        return JSON.stringify({
            "status_code": 500,
            "status_txt": "ALREADY_A_BITLY_LINK",
            "data": []
        }
        );
    },
    withInvalidToken: () => {
        return JSON.stringify({
            "status_code": 500,
            "status_txt": "INVALID_ARG_ACCESS_TOKEN",
            "data": []
        }
        );
    }
};

export default data;