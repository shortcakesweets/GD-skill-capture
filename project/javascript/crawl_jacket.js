const url = 'https://p.eagate.573.jp/game/gfdm/gitadora_galaxywave/p/playdata/music.html';
const gtype = '?gtype=dm';
const cat = '&cat=';
const batch_size = 5;
const batch_time = 1000;

async function make_jacket_list_full(){
    let jacket_list_full = {};
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
    
                    let jacket_list = tempElement.getElementsByClassName('jacket');
                    for(let i = 0; i < jacket_list.length; i++){
                        let img = jacket_list[i];
                        jacket_list_full[img.alt] = img.src;
                    }
                });
            console.log('parse complete on page : ', page);
        }
        catch(e){
            console.error('Error occured while parsing page : ', page, e);
        }
    }
    return jacket_list_full;
}

async function batch_keys(jacket_list) {
    // split keys by it's batch size
    let keys = Object.keys(jacket_list);
    let batched_keys = [];
    for(let i = 0; i < keys.length; i+=batch_size){
        batched_keys.push(keys.slice(i, i+batch_size));
    }
    return batched_keys;
}

async function download_from_keys(jacket_list, keys){
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let link = document.createElement('a');
        link.href = jacket_list[key];
        link.download = key + '.png';
        link.click();
    }
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    console.log('Collecting data...');
    let jacket_list = await make_jacket_list_full();
    console.log('parse complete with key size : ', Object.keys(jacket_list).length);
    console.log('batching keys...');
    let batched_keys = await batch_keys(jacket_list);
    console.log('batching complete with total batch of : ', batched_keys.length);
    console.log('starting download...');
    for(let i = 0; i < batched_keys.length; i++){
        let keys = batched_keys[i];
        await download_from_keys(jacket_list, keys);
        console.log('downloaded batch #', i, '/', batched_keys.length - 1);
        await delay(batch_time);
    }
    console.log('download complete');
}