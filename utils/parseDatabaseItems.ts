import { getDatabaseItems } from "../cms/notion";
import { CardData } from "../types/types";

export const parseDatabaseItems = (databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>) => 
    databaseItems.reduce<CardData[]>((acc, item) => {
        if(!("properties" in item)) return acc;

        const {Description, Published, Tags, Name} = item.properties;

        const cover = 
            item.cover?.type === "external" 
            ? item.cover.external.url 
            : item.cover?.file 
            ? item.cover.file.url 
            : "";
        const title = Name?.type === "title" ? Name.title[0].plain_text : "";
        const description = 
            Description?.type === "rich_text" 
            ? Description.rich_text[0]?.plain_text ?? ""
            : "";
        const published = Published?.type === "date" ? Published.date?.start ?? "" : "";
        const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

        const expiryTime = item.cover?.type  === "file" ? item.cover.file.expiry_time : item.icon?.type === "file" ? item.icon.file.expiry_time : "";

        acc.push({
            id: item.id,
            icon: item.icon,
            cover,
            title,
            description,
            published,
            tags,
            expiryTime,
        })

        return acc;
    }, []);
