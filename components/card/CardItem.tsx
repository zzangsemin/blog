import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { CardData } from 'types/types'
import IconRender from './IconRender';
import TagList from './tags/TagList';

interface CardItemProps{
  data: CardData;
}

const CardItem = ({data}: CardItemProps) => {
  const {id, cover, title, description, published, icon, tags} = data;

  return (
    <li>
      <article className='group'>
        <Link href={`/blog/${id}`}>
          <a>
            <div className='relative pt-[64%] rounded-lg overflow-hidden mb-4'>
              <Image src={cover} alt={title} layout='fill' objectFit='cover' className='group-hover:scale-110 transition-all duration-300' />
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold group-hover:text-blue-500'>
                <IconRender icon={icon} />
                {title}
              </h2>
              {description ? <p className='text-gray-700'>{description}</p> : null}
              <time className='text-gray-500 font-light'>{published}</time>
            </div>
          </a>
        </Link>
        <div className='mt-2'><TagList tags={tags} /></div>
      </article>
    </li>
  )
}

export default CardItem