import { getDatabaseItems, getPageContent } from 'cms/notion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ExtendedRecordMap } from 'notion-types';
import React from 'react'

interface BlogDetailsPageProps{
    recordMap: ExtendedRecordMap
}

const BlogDetailsPage = ({recordMap}: BlogDetailsPageProps) => {
  return (
    <div>BlogDetailsPage</div>
  )
}

export default BlogDetailsPage;

export const getStaticProps: GetStaticProps = async ({params}) => {
    const pageId = params?.pageId;

    if(!pageId)  throw Error("PageId is not defined");

    const recordMap = await getPageContent(pageId.toString());

    return {
        props: {
            recordMap,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const databaseId = process.env.DATABASE_ID;

    if (!databaseId) throw new Error('DATABASE_ID is not defiend')

    const databaseItems = await getDatabaseItems(databaseId);

    const paths = databaseItems.map(({ id: pageId }) => ({
        params: {
            pageId,
        },
    }));

    return {
        paths,
        fallback: true,
    }
}