const urlGhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=1';
const urlGoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=0';
const urlDhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=1';
const urlDoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=0';
const urlFrame = 'https://shortcakesweets.github.io/GD-skill-capture/noimage.html';

const fetchHTML = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
    const element = doc.querySelectorAll("#contents > div.maincont > div:nth-child(4) > table > tbody > tr");

    const data = [];
    for(const tr of element){
        const title_div = tr.querySelector("div.title");
        const title = title_div.querySelector("img").alt;
        const skill = tr.querySelector("td.skill_cell").innerText.replace(/[^0-9.]/g, '');
        const percent = tr.querySelector("td.achive_cell").innerText.replace(/ /g, '');
        const level = tr.querySelector("td.diff_cell").innerText.replace(/ /g, '');
        const difficulty = tr.querySelector("div[class*=diff_]").classList[1].substring(5);
        const part = tr.querySelector("div[class*=part_").classList[1].substring(5);
        const diffpart = difficulty + '-' + part[0];
        data.push({ title, skill, percent, level, diffpart, });
    }
    return data;
};

const fetchName = async() => {
    const response = await fetch("https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/profile.html");
    const html = await response.text();
    const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
    const name = doc.querySelector("div.profile_name_frame").innerHTML;
    //console.log(name);
    return name;
};

const getData = async (game) => {
    const urls = [];
    if(game == "GITA") urls.push(urlGhot, urlGoth);
    else if(game == "DORA") urls.push(urlDhot, urlDoth);
    else return;
    const results = await Promise.all(urls.map(url => fetchHTML(url)));
    const name = await fetchName();
    results.push(game, name);
    const hash = JSON.stringify(results);
    console.log(hash);
    const newPage = window.open(urlFrame + '#' + encodeURIComponent(hash));
};

getData("DORA");