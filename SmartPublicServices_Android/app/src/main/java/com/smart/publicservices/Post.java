package com.smart.publicservices;

import com.google.firebase.Timestamp;

public class Post {
    private String postTitle;
    private String postText;
    private String postUrl;
    private String postButtonText;
    private String postTitleColor;
    private String postTitleBold;
    private String postButtonColor;
    private String postBtnPos;
    private String link1Title, link1Url;
    private String link2Title, link2Url;
    private String link3Title, link3Url;
    private Timestamp postDate;

    public Post() {
    }

    public String getLink1Title() {
        return link1Title;
    }

    public void setLink1Title(String link1Title) {
        this.link1Title = link1Title;
    }

    public String getLink1Url() {
        return link1Url;
    }

    public void setLink1Url(String link1Url) {
        this.link1Url = link1Url;
    }

    public String getLink2Title() {
        return link2Title;
    }

    public void setLink2Title(String link2Title) {
        this.link2Title = link2Title;
    }

    public String getLink2Url() {
        return link2Url;
    }

    public void setLink2Url(String link2Url) {
        this.link2Url = link2Url;
    }

    public String getLink3Title() {
        return link3Title;
    }

    public void setLink3Title(String link3Title) {
        this.link3Title = link3Title;
    }

    public String getLink3Url() {
        return link3Url;
    }

    public void setLink3Url(String link3Url) {
        this.link3Url = link3Url;
    }

    public String getPostBtnPos() {
        return postBtnPos;
    }

    public void setPostBtnPos(String postBtnPos) {
        this.postBtnPos = postBtnPos;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostText() {
        return postText;
    }

    public void setPostText(String postText) {
        this.postText = postText;
    }

    public String getPostUrl() {
        return postUrl;
    }

    public void setPostUrl(String postUrl) {
        this.postUrl = postUrl;
    }

    public String getPostButtonText() {
        return postButtonText;
    }

    public void setPostButtonText(String postButtonText) {
        this.postButtonText = postButtonText;
    }

    public String getPostTitleColor() {
        return postTitleColor;
    }

    public void setPostTitleColor(String postTitleColor) {
        this.postTitleColor = postTitleColor;
    }

    public String getPostTitleBold() {
        return postTitleBold;
    }

    public void setPostTitleBold(String postTitleBold) {
        this.postTitleBold = postTitleBold;
    }

    public String getPostButtonColor() {
        return postButtonColor;
    }

    public void setPostButtonColor(String postButtonColor) {
        this.postButtonColor = postButtonColor;
    }

    public String getPostBtnStyle() {
        return postBtnStyle;
    }

    public void setPostBtnStyle(String postBtnStyle) {
        this.postBtnStyle = postBtnStyle;
    }

    public String getPostBtnCase() {
        return postBtnCase;
    }

    public void setPostBtnCase(String postBtnCase) {
        this.postBtnCase = postBtnCase;
    }

    public Timestamp getPostDate() {
        return postDate;
    }

    public void setPostDate(Timestamp postDate) {
        this.postDate = postDate;
    }
}
