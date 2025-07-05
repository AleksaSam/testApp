import React from 'react'

type Props = {
    src?: string
    alt: string
}

export const BookImage: React.FC<Props> = ({ src, alt }) => (
    <div className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
       <img 
            src={src || 'https://placehold.co/128x193?text=No+Image'}
            alt={alt}
            className="w-full h-auto object-contain"
        /> 
    </div>
)