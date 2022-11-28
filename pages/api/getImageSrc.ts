import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getPageItem } from "cms/notion";
import type { NextApiRequest, NextApiResponse } from 'next'
import { CardData } from "types/types";

interface ImageSrc{
    cover: CardData["cover"];
    icon: CardData["icon"];
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<ImageSrc>
) => {
    const {id} = req.query;

    if(!id) throw new Error("No id provided");

    const pageItem = await getPageItem(id.toString());

    console.log("pageItem >>", pageItem);

    if(!("properties" in pageItem)) throw new Error("No properties in pageItem");

    const cover = 
        pageItem.cover?.type === "external" 
        ? pageItem.cover.external.url 
        : pageItem.cover?.file 
        ? pageItem.cover.file.url 
        : "";

    res.status(200).json({ cover, icon: pageItem.icon });
}

export default handler;