import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { CardData } from 'types/types'
import IconRender from './IconRender';
import TagList from './tags/TagList';
import { motion } from 'framer-motion'
import { ImageSrcType } from 'pages/api/getImageSrc';
import { IMAGE_LOADING_INDICATION } from 'const/const';
import LoadingSpinner from 'components/common/LoadingSpinner';

interface CardItemProps{
  data: CardData;
}

const CardItem = ({data}: CardItemProps) => {
  const {id, cover, title, description, published, icon, tags, expiryTime, preview} = data;

  const [coverSrc, setCoverSrc] = useState(cover);
  const [iconSrc, setIconSrc] = useState(icon);
  const [isLoading, setIsLoading] = useState(true);

  const getImageSrc = useCallback(async () => {
    setIsLoading(true);

    const res = await fetch(`api/getImageSrc?id=${id}`);
    const {cover, icon}: ImageSrcType = await res.json();

    setCoverSrc(cover);
    setIconSrc(icon);
  }, [id]);

  useEffect(() => {
    const isExpired = new Date(expiryTime) < new Date();

    if(isExpired) getImageSrc();
  }, [expiryTime, getImageSrc]);

  return (
    <motion.li
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 1}}
      viewport={{once: true}}
    >
      <article className='group'>
        <Link href={`/blog/${id}`}>
          <a>
            <div className='relative pt-[64%] rounded-lg overflow-hidden mb-4'>
              <Image 
                src={coverSrc} 
                alt={title} 
                layout='fill' 
                objectFit='cover' 
                className={`group-hover:scale-110 transition-all duration-300`}
                onError={getImageSrc} 
                placeholder="blur"
                blurDataURL={preview?.dataURIBase64 ?? IMAGE_LOADING_INDICATION}
                onLoad={() => setIsLoading(false)}
              />
              {isLoading ? (
                <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                  <LoadingSpinner />
                </div>
              ) : null}
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold group-hover:text-blue-500'>
                <IconRender icon={iconSrc} />
                {title}
              </h2>
              {description ? <p className='text-gray-700'>{description}</p> : null}
              <time className='text-gray-500 font-light'>{published}</time>
            </div>
          </a>
        </Link>
        <div className='mt-2'><TagList tags={tags} /></div>
      </article>
    </motion.li>
  )
}

export default CardItem