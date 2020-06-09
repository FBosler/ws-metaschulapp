import React from "react";

import {
    FacebookButton,
    TwitterButton,
    LinkedinButton,
    WhatsappButton,
    PinterestButton,
    RedditButton,
    EmailButton,
    IconWrapper,
    LinkIcon,
} from "./styles";

import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    EmailIcon,
} from "react-share";

const ShareButtons = () => {
    // const referralCode = "DEFAULT_CODE";
    // generateFinalUrl(referralCode)
    let finalUrl = process.env.FRONT_END_URL
    if (process.browser) {
        finalUrl = window.location.href
    }

    const title = "check out this amazing new app";
    const emailMessage = "check out this amazing new app and become part of the movement: ";
    const iconSize = 42;
    const CAT_IMAGE = "https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_1280.jpg";

    return (
        <div style={{ display: "flex" }}>
            <FacebookButton url={finalUrl} quote={title} className="col center-align">
                <FacebookIcon size={iconSize} round />
            </FacebookButton>

            <TwitterButton url={finalUrl} title={title} hashtags={["referral"]} className="col">
                <TwitterIcon size={iconSize} round />
            </TwitterButton>

            <WhatsappButton url={finalUrl} title={title} className="col">
                <WhatsappIcon size={iconSize} round />
            </WhatsappButton>

            <LinkedinButton url={finalUrl} windowWidth={750} windowHeight={600} className="col">
                <LinkedinIcon size={iconSize} round />
            </LinkedinButton>

            <PinterestButton url={finalUrl} media={CAT_IMAGE} className="col">
                <PinterestIcon size={iconSize} round />
            </PinterestButton>

            <RedditButton url={finalUrl} title={title} className="col">
                <RedditIcon size={iconSize} round />
            </RedditButton>

            <EmailButton url={finalUrl} subject={title} body={emailMessage}>
                <EmailIcon bgStyle={{ fill: "lightskyblue" }} size={42} round />
            </EmailButton>

            <IconWrapper iconSize={iconSize}>
                <LinkIcon
                    size={32}
                    onClick={() => {
                        window.prompt("Copy to clipboard: Ctrl+C, Enter", finalUrl);
                    }}
                />
            </IconWrapper>
        </div>
    );
};

export default ShareButtons;
