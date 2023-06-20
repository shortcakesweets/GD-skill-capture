const urlGhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=1';
const urlGoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=0';
const urlDhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=1';
const urlDoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=0';
const urlFrame = 'https://shortcakesweets.github.io/GD-skill-capture/';

const fetchHTML = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
    const element = doc.querySelectorAll("#contents > div.maincont > div:nth-child(4) > table > tbody > tr");

    const data = [];
    for(const tr of element){
        const title_div = tr.querySelector("div.title");
        const jacket_url = title_div.querySelector("img").src;
        const url_compressed = jacket_url.substring(jacket_url.indexOf("imgid=") + 6);
        const title = title_div.querySelector("img").alt;
        const skill = tr.querySelector("td.skill_cell").innerText.replace(/[^0-9.]/g, '');
        const percent = tr.querySelector("td.achive_cell").innerText.replace(/ /g, '');
        const level = tr.querySelector("td.diff_cell").innerText.replace(/ /g, '');
        const difficulty = tr.querySelector("div[class*=diff_]").classList[1].substring(5);
        data.push({ url_compressed, title, skill, percent, level, difficulty, });
    }
    return data;
};

const getDataDORA = async () => {
    const urls = [urlDhot, urlDoth];
    const results = await Promise.all(urls.map(url => fetchHTML(url)));
    results.push("DORA");
    const hash = JSON.stringify(results);
    console.log(hash);
    const newPage = window.open(urlFrame + '#' + encodeURIComponent(hash));
}

const getDataGITA = async () => {
    const urls = [urlGhot, urlGoth];
    const results = await Promise.all(urls.map(url => fetchHTML(url)));
    results.push("GITA");
    const hash = JSON.stringify(results);
    console.log(hash);
    const newPage = window.open(urlFrame + '#' + encodeURIComponent(hash));
}

/* Usage
getDataDORA();
 - opens new window with hash(skill data) param
*/