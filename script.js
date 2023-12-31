// const
const jacket_base = "https://p.eagate.573.jp/game/gfdm/gitadora_fuzzup/p/playdata/img.html?imgkey=music_skill_gitadora-fuzzup-";
const jacket_base_GHot = "gf_1&imgid=";
const jacket_base_GOth = "gf_0&imgid=";
const jacket_base_DOth = "dm_0&imgid=";
const jacket_base_DHot = "dm_1&imgid=";

// Set the current time to the 'time' element
const timeElement = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = currentTime;
	
// parse data
let imgsrc_Hot = jacket_base;
let imgsrc_Oth = jacket_base;
let hash = '';
let data = [];
if(document.location.hash.length != 0){
	hash = document.location.hash.substring(1);
	data = JSON.parse(decodeURIComponent(hash));
	console.log(data);
	if(data[2] == "GITA"){
		imgsrc_Hot += jacket_base_GHot;
		imgsrc_Oth += jacket_base_GOth;
	}
	else {
		imgsrc_Hot += jacket_base_DHot;
		imgsrc_Oth += jacket_base_DOth;
	}
	setTable(data[2]);
}
	
function setTable(gitadora){
	const tbodyHot = document.getElementById("skillHot");
	const tbodyOth = document.getElementById("skillOth");
	let valHot = 0;
	let valOth = 0;
	for (let i = 0; i < 25; i++) {
		valHot += parseFloat(data[0][i].skill);
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${i + 1}</td>
			<td><img src=${imgsrc_Hot + data[0][i].url_compressed}
				alt=${data[0][i].title}
				width="100px" height="100px"></td>
			<td class="cap-text">${data[0][i].title}<br>${data[0][i].diffpart} ${data[0][i].level}</td>
				<td>${data[0][i].skill}<br>${data[0][i].percent}</td>
			`;
		tbodyHot.appendChild(row);
	}
	for (let i = 0; i < 25; i++) {
		valOth += parseFloat(data[1][i].skill);
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${i + 1}</td>
			<td><img src=${imgsrc_Oth + data[1][i].url_compressed}
				alt=${data[1][i].title}
				width="100px" height="100px"></td>
			<td class="cap-text">${data[1][i].title}<br>${data[1][i].diffpart} ${data[1][i].level}</td>
			<td>${data[1][i].skill}<br>${data[1][i].percent}</td>
		`;
		tbodyOth.appendChild(row);
	}
	document.querySelector("#skillValueHot").innerHTML = valHot.toFixed(2);
	document.querySelector("#skillValueOth").innerHTML = valOth.toFixed(2);
	document.querySelector("#total_skill").innerHTML += (valHot + valOth).toFixed(2);
	document.querySelector("#game_name").innerHTML = data[3];
	document.querySelector("#game_which").innerHTML = gitadora;
};