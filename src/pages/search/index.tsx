import React, { useEffect, useState } from 'react'
import { PlaylistOrAlbumCard } from '../../components/PlaylistOrAlbumCard';
import { apiInfo } from '../../components/utils/api';
import { convertSecondsToMinutes } from '../../components/utils/convertTime';
import { Track } from '../../components/utils/types';

import style from './style.module.scss';

type Search = {
    data: Track[];
    prev: string;
    next: string;
    total: number;
}

export default function Search() {

    const [itemToSearch, setItemToSearch] = useState("");
    const [foundItem, setFoundItem] = useState<Search>({} as Search);

    useEffect(() => {
        async function searchContent() {
            const data = await fetch(`${apiInfo.BASE_URL}/search?q=${itemToSearch.toLowerCase()}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": apiInfo.API_KEY,
                    "x-rapidapi-host": apiInfo.HOST
                }
            })
            .then(response => response.json())
            setFoundItem(data);
        }
        searchContent();
    },[itemToSearch])
    
    console.log(itemToSearch)
    console.log(foundItem)

    return (
        <div className={style.searchContainer}>
            <input onChange={(event) => setItemToSearch(event.target.value)}/>
            <button type="button">APERTAR</button>
            <p>Total Itens: {foundItem.total}</p>

            <div className={style.itemsContainer}>
                {foundItem.data?.map((item: Track) => (
                    <div key={item.id} className={style.trackContainer}>
                        <div className={style.imageTrack}>
                            <img src={item.album.cover_medium} alt="" />
                        </div>
                        <div className={style.infoBarTrack}>
                            <div className={style.trackTitle}>
                                <h3 title={item.title_short}>{item.title_short}</h3>
                                <div>
                                    <span>by {item.artist.name}</span>
                                    <img src={item.artist.picture_small}/>
                                </div>
                            </div>
                            <div className={style.infoFromTrack}>
                                {item.explicit_lyrics && (
                                    <span className={style.explicit}>Explicit</span>
                                )}
                                <span>Duration: {convertSecondsToMinutes(item.duration)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
