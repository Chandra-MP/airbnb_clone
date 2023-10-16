'use client'

import React from 'react'
import Container from '../Container'
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiSkateboard, GiWindmill } from 'react-icons/gi';
import { MdDownhillSkiing, MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';


export const categories = [
    {
        label : "Beach",
        icon : TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label : "Windmills",
        icon : GiWindmill,
        description: 'This property has windmills!'
    },
    {
        label : "Modern",
        icon : MdOutlineVilla,
        description: 'This property is Modern!'
    },
    {
        label : "Country_Side",
        icon : TbMountain,
        description: 'This property is in Countryside!'
    },
    {
        label : "Pools",
        icon : TbPool,
        description: 'This property has Pools!'
    },
    {
        label : "Islands",
        icon : GiIsland,
        description: 'This property is in a Island!'
    },
    {
        label : "Lakes",
        icon : GiBoatFishing,
        description: 'This property is Close to a Lake!'
    },
    {
        label : "Skiing",
        icon : MdDownhillSkiing,
        description: 'This property has skiing activities!'
    },
    {
        label : "Castles",
        icon : GiCastle,
        description: 'This property is a Castle!'
    },
    {
        label : "Camping",
        icon : GiForestCamp,
        description: 'This property has Camping activities!'
    },
    {
        label : "Arctic",
        icon : GiCaveEntrance,
        description: 'This property is inside a Cave!'
    },
    {
        label : "Desert",
        icon : GiDesert,
        description: 'This property is in a Desert!'
    },
    {
        label : "Barns",
        icon : GiBarn,
        description: 'This property is in the Barn!'
    },
    {
        label : "Lux",
        icon : IoDiamond,
        description: 'This property is Close to a Lake!'
    },
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');

    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox
                key = {item.label} 
                label = {item.label}
                selected = {category == item.label}
                icon = {item.icon} />
            ))}
        </div>
    </Container>
  )
}

export default Categories
