var urlGhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=1'
var urlGoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=gf&stype=0'
var urlDhot = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=1'
var urlDoth = 'https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/skill.html?gtype=dm&stype=0'
var urlFrame = 'https://shortcakesweets.github.io/GD-skill-capture/'

function fetchData(target_url){
	return new Promise((resolve, reject) => {
		fetch(url = target_url)
		.then(response => response.text())
		.then(html => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			const element = doc.querySelector("#contents > div.maincont > div:nth-child(4) > table");
			resolve(element);
		})
		.catch(error => {
			reject(error);
		});
	});
};

function parseDORA(){
	var page = window.open(urlFrame);
	
	fetchData(urlDhot)
		.then(value => {
			var body = value.getElementsByTagName('tbody');
			var rows = body[0].getElementsByTagName('tr');
			for(let i=0; i<rows.length; i++){
				var row = rows[i];
				var jacket = (row.getElementsByClassName("jacket"))[0];
				var point = (row.getElementsByClassName("skill_cell"))[0];
				var percent = (row.getElementsByClassName("achive_cell"))[0];
				var level = (row.getElementsByClassName("diff_cell"))[0];
				
				console.log("jacket:", jacket);
				console.log("point:", point);
				console.log("percent:", percent);
				console.log("level:", level);
				break;
			}
		})
		.catch(error => {console.error('error:', error)});
	fetchData(urlDoth)
		.then(value => {console.log(value); oth = value;})
		.catch(error => {console.error('error:', error)});
};

parseDORA();
//var newPage = makePage();
