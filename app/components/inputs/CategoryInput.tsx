'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
  return (
    <div
    onClick={() => {
        onClick(label)
    }}
    className={`
    rounded  border-2 p-4 flex flex-col gap-3 hover:border-black transition 
    items-center
    cursor-pointer
    ${selected ? 'border-black' : 'border-neutral-100 border-opacity-5'}`}
    >
      <Icon size={30} />
      <div className='font-semibold'>
        {label}
      </div>
    </div>
  )
}

export default CategoryInput
