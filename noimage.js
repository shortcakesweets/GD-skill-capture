// Set the current time to the 'time' element
const timeElement = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = currentTime;
	
// parse data
let hash = '';
let data = [];
if(document.location.hash.length != 0){
	hash = document.location.hash.substring(1);
	data = JSON.parse(decodeURIComponent(hash));
	console.log(data);
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
			<td class="cap-text"><strong>${data[0][i].title}</strong><br>${data[0][i].diffpart} ${data[0][i].level}</td>
				<td><strong>${data[0][i].skill}</strong><br>${data[0][i].percent}</td>
			`;
		tbodyHot.appendChild(row);
	}
	for (let i = 0; i < 25; i++) {
		valOth += parseFloat(data[1][i].skill);
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${i + 1}</td>
			<td class="cap-text"><strong>${data[1][i].title}</strong><br>${data[1][i].diffpart} ${data[1][i].level}</td>
			<td><strong>${data[1][i].skill}</strong><br>${data[1][i].percent}</td>
		`;
		tbodyOth.appendChild(row);
	}
	document.querySelector("#skillValueHot").innerHTML = valHot.toFixed(2);
	document.querySelector("#skillValueOth").innerHTML = valOth.toFixed(2);
	document.querySelector("#total_skill").innerHTML += (valHot + valOth).toFixed(2);
	document.querySelector("#game_name").innerHTML = data[3];
	document.querySelector("#game_which").innerHTML = gitadora;
	
	const tableHot = document.getElementById('skillTableHot');
	const tableOth = document.getElementById('skillTableOth');
	const N = tableHot.rows.length;

	let maxHeight = 0;
	for (let i = 1; i < N; i++) {
		let height = tableHot.rows[i].offsetHeight;
		if (height > maxHeight) maxHeight = height;
		height = tableOth.rows[i].offsetHeight;
		if (height > maxHeight) maxHeight = height;
	}

	// Set the same height for all rows
	for (let i = 1; i < N; i++) {
		tableHot.rows[i].style.height = maxHeight + 'px';
		tableOth.rows[i].style.height = maxHeight + 'px';
	}
};