const axios = require("axios").default;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/:address', async (request, response) => {
    let result = null;
    var options = {
        method: 'GET',
        url: `https://ipinfo.io/widget/${request.params.address}`,
        headers: {
            authority: 'ipinfo.io',
            method: 'GET',
            path: `/widget/${request.params.address}`,
            scheme: 'https',
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            referer: 'https://ipinfo.io/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'
        }
    };
    await axios.request(options).then(function (response) {
        result = response.data;
    }).catch(function (error) {
        console.error(error);
    });
    return response.status(200).json(result);
});

app.use(function (request, response, next) {
    return response.status(404).json({ message: 'Page not found' });
});


app.listen(process.env.PORT || 3000);