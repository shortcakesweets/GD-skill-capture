const url = 'https://p.eagate.573.jp/game/gfdm/gitadora_galaxywave/p/playdata/music.html';
const gtype = '?gtype=dm';
const cat = '&cat=';

let song_data = {};

function parse_song_list(song_list){
    for(let i=0; i<song_list.length; i++){
        let song = song_list[i];
        fetch(song.href)
            .then(response => response.text())
            .then(html => {
                let tempElement = document.createElement('div');
                tempElement.innerHTML = html;
                let chart_list = tempElement.getElementsByClassName('diff_area');
                let song_difficulty = [];
                for(let j=0; j<chart_list.length; j++){
                    song_difficulty.push(chart_list[j].innerText);
                }
                let song_name = song.innerText.trim();
                song_data[song_name] = {};
                song_data[song_name]['song_name'] = song_name;
                song_data[song_name]['difficulty'] = song_difficulty;
            })
            .catch(error => {
                console.error('Error fetching HTML: ', error);
            });
    }
}

async function request_sequentially(){
    for(let page=0; page<=36; page++){
        let full_url = url + gtype + cat + page;
        try{
            const response = await fetch(full_url)
                .then(response => {
                    if(!response.ok){
                        throw new Error('');
                    }
                    return response.text();
                })
                .then(htmlContents => {
                let tempElement = document.createElement('div');
                tempElement.innerHTML = htmlContents;

                let song_list = tempElement.getElementsByClassName('text_link');
                parse_song_list(song_list);
            })
            .then(a=>{
                console.log('page : ' + page + ' completed');
            })
            .catch(error => {
                console.error(error);
            });
        }
        catch(error){
            console.error('Error while fetching : ', error);
        }
    }
}

request_sequentially();