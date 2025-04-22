import React from "react";
import { IData_SnippetNews } from "./interfaces";
import "./NewsSnippet.scss";
interface NewsSnippetProps {
    data: IData_SnippetNews;
}
declare const NewsSnippet: React.FC<NewsSnippetProps>;
export default NewsSnippet;
