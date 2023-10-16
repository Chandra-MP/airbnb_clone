'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import qs from 'query-string'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;

}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon, //this is just an alias
    label,
    selected
}) => {


  const router = useRouter();
  const params = useSearchParams(); //To handle various amounts of search parameters from URL


  //This is how to build Query for database 
  const handleClick = useCallback(()=> {
    let currentQuery = {}; //This is to query to the data base to fetch results

    if(params){
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery, 
      category: label //This will add category param in our URL if any category is clicked
    }

    //This removes the category from the URL as it was previously selected so selecting the same query again will deselect it;
    if(params?.get('category') == label){
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull : true});

    router.push(url);


  }, [label, params, router]);

  

  return (
    <div 
    onClick={handleClick}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${selected ? 'border-b-neutral-800': 'border-transparent'}\
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
      <Icon size ={26} />
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
