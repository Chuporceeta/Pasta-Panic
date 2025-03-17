import {Context, Devvit, useState} from "@devvit/public-api";
import {PinnedPost} from "./PinnedPost.js";

export const Router: Devvit.CustomPostComponent = (context: Context) => {

    return (
        <PinnedPost/>
    );
};