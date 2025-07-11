const express = require("express");
const app = express();
const axios = require("axios");
const docusign = require("docusign-esign");
require("dotenv").config();

app.use(express.json());

let accessToken = null;
let accountId = null;
let basePath = null;
const apiClient = new docusign.ApiClient();

app.get("/docusign/auth", (req, res) => {
    const { DS_CLIENT_ID, DS_REDIRECT_URI } = process.env;

    const authUrl = `${process.env.DS_AUTH_BASE}/oauth/auth?response_type=code&scope=signature&client_id=${DS_CLIENT_ID}&redirect_uri=${DS_REDIRECT_URI}`;
    res.redirect(authUrl);
});

app.get("/docusign/callback", async (req, res) => {
    const { code } = req.query;

    const creds = Buffer.from(
        `${process.env.DS_CLIENT_ID}:${process.env.DS_CLIENT_SECRET}`
    ).toString("base64");

    try {
        const tokenRes = await axios.post(
            `${process.env.DS_AUTH_BASE}/oauth/token`,
            new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.DS_REDIRECT_URI,
            }),
            {
                headers: {
                    Authorization: `Basic ${creds}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        accessToken = tokenRes.data.access_token;
        apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

        const userInfo = await apiClient.getUserInfo(accessToken);
        const account = userInfo.accounts[0];
        accountId = account.accountId;
        basePath = account.baseUri + "/restapi";
        apiClient.setBasePath(basePath);

        res.send("DocuSign authenticated! You can now submit forms.");
    } catch (e) {
        console.error("Auth error:", e.response?.data || e.message);
        res.status(500).send("OAuth failed");
    }
});

app.listen(4000, () => {
    console.log("Server started on port 4000");
});
