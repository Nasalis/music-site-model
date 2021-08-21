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
    const [itemHasFounded, setItemHasFounded] = useState(false);

    function emptyItemToSearch() {
        return setItemToSearch("");
    }

    async function searchContent() {
        if(itemToSearch === "") {
            setItemHasFounded(false);
            return;
        }
        const data = await fetch(`${apiInfo.BASE_URL}/search?q=${itemToSearch.toLowerCase()}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": apiInfo.API_KEY,
                "x-rapidapi-host": apiInfo.HOST
            }
        })
        .then(response => response.json())
        setFoundItem(data);
        setItemHasFounded(true);
    }
    
    console.log(itemToSearch)
    console.log(foundItem)

    return (
        <div className={style.searchContainer}>
            <div className={style.inputForTracks}>
                <input onChange={(event) => setItemToSearch(event.target.value)}/>
                <button type="button" onClick={searchContent}>Search</button>
                <p>Total Itens: {foundItem.total}</p>
            </div>

            {(!itemHasFounded || foundItem.total === 0)? (
                <div className={style.alertBox}>
                    <h2>Any track has been founded</h2>
                    <small>Try typing again in input</small>
                    <i className="fas fa-database"></i>
                </div>
            ) : (
                <div className={style.itemsContainer}>
                    {foundItem.data?.map((item: Track) => (
                        <div key={item.id} className={style.trackContainer} >
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
            )}

            
        </div>
    )
}
