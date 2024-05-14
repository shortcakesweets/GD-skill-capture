const url = 'https://p.eagate.573.jp/game/gfdm/gitadora_galaxywave/p/playdata/music.html';
const gtype = '?gtype=dm';
const cat = '&cat=';
const batch_size = 5;
const batch_time = 500;
const play_data_meaning = ['play_count', 'clear_count', 'rank', 'rate', 'score', 'max_combo'];

async function make_song_list_full(){
    let song_list_full = {};
    for(let page = 0; page <= 36; page++){
        let full_url = url + gtype + cat + page;
        try{
            const res = await fetch(full_url)
                .then(response => {
                    if(!response.ok){
                        throw new Error('');
                    }
                    return response.text();
                })
                .then(responseHTML => {
                    let tempElement = document.createElement('div');
                    tempElement.innerHTML = responseHTML;

                    let song_list = tempElement.getElementsByClassName('text_link');
                    for(let i = 0; i < song_list.length; i++){
                        let song = song_list[i];
                        song_list_full[song.innerText.trim()] = song.href;
                    }
                });
            console.log('parse complete on page : ', page);
        }
        catch(e){
            console.error('Error occured while parsing page : ', page, e);
        }
    }
    return song_list_full;
}

async function batch_keys(song_list) {
    // split keys by it's batch size
    let keys = Object.keys(song_list);
    let batched_keys = [];
    for(let i = 0; i < keys.length; i+=batch_size){
        batched_keys.push(keys.slice(i, i+batch_size));
    }
    return batched_keys;
}

// deprecated
/*
async function parse_data_from_url(song_url){
    let parse_result = {};
    try{
        const res = await fetch(song_url)
            .then(response => {
                if(!response.ok){
                    throw new Error('');
                }
                return response.text();
            })
            .then(responseHTML => {
                let tempElement = document.createElement('div');
                tempElement.innerHTML = responseHTML;

                const song_name = tempElement.getElementsByClassName('live_title')[0].innerText.trim();
				const level_list = tempElement.getElementsByClassName('diff_area');
				const data_table = tempElement.getElementsByClassName('md music_detail');
				
				parse_result['song_name'] = song_name;
				parse_result['play_data'] = [];
				
				for(let i = 0; i < level_list.length; i++){
					const table = data_table[i].children[1];
					
					let sub_play_data = {};
					sub_play_data['level'] = level_list[i].innerText;
					for(let j = 0; j < play_data_meaning.length; j++){
						if(j != 2){ // except rank
							sub_play_data[play_data_meaning[j]] = table.children[j].children[1].innerText;
						}
						else{ // if rank
							let className = table.children[j].children[2].className;
							let className_split = className.split(' ');
							let rank = className_split[className_split.length - 1];
							sub_play_data[play_data_meaning[j]] = rank;
						}
					}
					parse_result['play_data'].push(sub_play_data);
				}
            });
    }
    catch(e){
        console.error('Error occured while getting data', e);
    }
	return parse_result;
}
*/

async function parse_data_from_urls(play_data, song_list, key_list){
	for(let key of key_list){
		let song_url = song_list[key];
		fetch(song_url)
            .then(response => {
                if(!response.ok){
                    throw new Error('');
                }
                return response.text();
            })
            .then(responseHTML => {
				play_data[key] = {};
                let tempElement = document.createElement('div');
                tempElement.innerHTML = responseHTML;

                const song_name = tempElement.getElementsByClassName('live_title')[0].innerText.trim();
				const level_list = tempElement.getElementsByClassName('diff_area');
				const data_table = tempElement.getElementsByClassName('md music_detail');
				
				play_data[key]['song_name'] = song_name;
				play_data[key]['play_data'] = [];
				
				for(let i = 0; i < level_list.length; i++){
					const table = data_table[i].children[1];
					
					let sub_play_data = {};
					sub_play_data['level'] = level_list[i].innerText;
					for(let j = 0; j < play_data_meaning.length; j++){
						if(j != 2){ // except rank
							sub_play_data[play_data_meaning[j]] = table.children[j].children[1].innerText;
						}
						else{ // if rank
							let className = table.children[j].children[2].className;
							let className_split = className.split(' ');
							let rank = className_split[className_split.length - 1];
							sub_play_data[play_data_meaning[j]] = rank;
						}
					}
					play_data[key]['play_data'].push(sub_play_data);
				}
            })
			.catch(e => {
				console.error(e);
			});
	}
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadJSON(play_data){
	const jsonString = JSON.stringify(play_data);
	const blob = new Blob([jsonString], {type : 'application/json'});
	const downloadURL = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = downloadURL;
	a.download = 'data.json';

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(downloadURL);
}

async function main(){
	let play_data = {};
	
    console.log('Collecting data...');
    let song_list = await make_song_list_full();
    console.log('parse complete with key size : ', Object.keys(song_list).length);
	console.log('batching keys...');
    let batched_keys = await batch_keys(song_list);
    console.log('batching complete with total batch of : ', batched_keys.length);
    console.log('starting crawling...');
	for(let i = 0; i < batched_keys.length; i++){
        let keys = batched_keys[i];
        await parse_data_from_urls(play_data, song_list, keys);
        console.log('downloaded batch #', i, '/', batched_keys.length - 1);
        await delay(batch_time);
	}

	downloadJSON(play_data);
}