# GD-skill-capture
 기타도라 스킬표 캡쳐기능

## 사용법
  e-amusement 페이지에 로그인한 뒤, [GITADORA](https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/index.html) 페이지에 접속합니다.

주소창에 다음을 복사합니다.

*주의 : 맨 앞의 'javascript:' 가 사라지게 되므로 수동으로 입력해주셔야 됩니다.*

모바일,컴퓨터 모두 클릭시 복사 기능이 있습니다.

 **기타프릭스**:
```
javascript:const urlGhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=1';const urlGoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=0';const urlDhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=1';const urlDoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=0';const urlFrame = 'https://shortcakesweets.github.io/GD-skill-capture/';const fetchHTML = async (url) => {const response = await fetch(url);const html = await response.text();const parser = new DOMParser();const doc = parser.parseFromString(html, 'text/html');const element = doc.querySelectorAll("#contents > div.maincont > div:nth-child(4) > table > tbody > tr");const data = [];for(const tr of element){const title_div = tr.querySelector("div.title");const jacket_url = title_div.querySelector("img").src;const url_compressed = jacket_url.substring(jacket_url.indexOf("imgid=") + 6);const title = title_div.querySelector("img").alt;const skill = tr.querySelector("td.skill_cell").innerText.replace(/[^0-9.]/g, '');const percent = tr.querySelector("td.achive_cell").innerText.replace(/ /g, '');const level = tr.querySelector("td.diff_cell").innerText.replace(/ /g, '');const difficulty = tr.querySelector("div[class*=diff_]").classList[1].substring(5);const part = tr.querySelector("div[class*=part_").classList[1].substring(5);const diffpart = difficulty + '-' + part[0];data.push({ url_compressed, title, skill, percent, level, diffpart, });}return data;};const fetchName = async() => {const response = await fetch("https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/profile.html");const html = await response.text();const parser = new DOMParser();const doc = parser.parseFromString(html, 'text/html');const name = doc.querySelector("div.profile_name_frame").innerHTML;return name;};const getData = async (game) => {const urls = [];if(game == "GITA") urls.push(urlGhot, urlGoth);else if(game == "DORA") urls.push(urlDhot, urlDoth);else return;const results = await Promise.all(urls.map(url => fetchHTML(url)));const name = await fetchName();results.push(game, name);const hash = JSON.stringify(results);console.log(hash);const newPage = window.open(urlFrame + '#' + encodeURIComponent(hash));};getData("GITA");
```

 **드럼매니아**
 ```
javascript:const urlGhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=1';const urlGoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=0';const urlDhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=1';const urlDoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=0';const urlFrame = 'https://shortcakesweets.github.io/GD-skill-capture/';const fetchHTML = async (url) => {const response = await fetch(url);const html = await response.text();const parser = new DOMParser();const doc = parser.parseFromString(html, 'text/html');const element = doc.querySelectorAll("#contents > div.maincont > div:nth-child(4) > table > tbody > tr");const data = [];for(const tr of element){const title_div = tr.querySelector("div.title");const jacket_url = title_div.querySelector("img").src;const url_compressed = jacket_url.substring(jacket_url.indexOf("imgid=") + 6);const title = title_div.querySelector("img").alt;const skill = tr.querySelector("td.skill_cell").innerText.replace(/[^0-9.]/g, '');const percent = tr.querySelector("td.achive_cell").innerText.replace(/ /g, '');const level = tr.querySelector("td.diff_cell").innerText.replace(/ /g, '');const difficulty = tr.querySelector("div[class*=diff_]").classList[1].substring(5);const part = tr.querySelector("div[class*=part_").classList[1].substring(5);const diffpart = difficulty + '-' + part[0];data.push({ url_compressed, title, skill, percent, level, diffpart, });}return data;};const fetchName = async() => {const response = await fetch("https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/profile.html");const html = await response.text();const parser = new DOMParser();const doc = parser.parseFromString(html, 'text/html');const name = doc.querySelector("div.profile_name_frame").innerHTML;return name;};const getData = async (game) => {const urls = [];if(game == "GITA") urls.push(urlGhot, urlGoth);else if(game == "DORA") urls.push(urlDhot, urlDoth);else return;const results = await Promise.all(urls.map(url => fetchHTML(url)));const name = await fetchName();results.push(game, name);const hash = JSON.stringify(results);console.log(hash);const newPage = window.open(urlFrame + '#' + encodeURIComponent(hash));};getData("DORA");
```

자동으로 새 창에 스킬표가 등장합니다.

## 개발현황
 - 2023.06.21 기본기능 구현 완료.
