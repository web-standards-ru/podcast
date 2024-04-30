import fs from "node:fs";

// Добавляет эпизод в README
let readmeContent = fs.readFileSync("README.md").toString();
const prevEpisode = Number(
	readmeContent.match(/\[(\d+)\]: src\/episodes\/(\d+)\/index.md/)[1]
);

if (!prevEpisode) {
	console.error("Не получилось достать номер прошлого эпизода из README.md.");
	process.exit(1);
}

const episode = prevEpisode + 1;

if (!readmeContent.includes(`| ${episode}     |`)) {
	readmeContent = readmeContent.replace(
		"<details open>",
		`${generateNewTable(episode)}

<details>`
	);
}

readmeContent = readmeContent
	.replace(
		episodeLinkString(episode - 1),
		`${episodeLinkString(episode)}\n${episodeLinkString(episode - 1)}`
	)
	.replace(`| ${episode}     |`, `| [${episode}][] |`);

fs.writeFileSync("README.md", readmeContent);

// Создаёт файлы для нового эпизода
if (!fs.existsSync(`src/episodes/${episode}`)) {
	fs.mkdirSync(`src/episodes/${episode}`);
}
const episodeTemplateContent = fs
	.readFileSync("src/template/index.md")
	.toString();
fs.writeFileSync(`src/episodes/${episode}/index.md`, episodeTemplateContent);

const monday = new Date();
monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));
monday.setUTCHours(9);
monday.setMinutes(0);
monday.setSeconds(0);
monday.setMilliseconds(0);
const mondayString = monday.toISOString().slice(0, 16);
const episodeYmlContent = fs
	.readFileSync("src/template/index.yml")
	.toString()
	.replace("date: 3000-01-01T09:00", `date: ${mondayString}`);
fs.writeFileSync(`src/episodes/${episode}/index.yml`, episodeYmlContent);

console.info(`Пустышки для эпизода ${episode} сгенерированы. Теперь заполни их:
- src/episodes/${episode}/index.yml
- src/episodes/${episode}/index.md
`);

function episodeLinkString(episode) {
	return `[${episode}]: src/episodes/${episode}/index.md`;
}

function generateNewTable(episode) {
	const startNumber = Math.floor(episode / 100) * 100 + 100;
	let table = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			table += `| ${startNumber - i * 10 - j}     `;
		}
		table += "|\n";
	}
	return `<details open>
	<summary>№${startNumber}–${startNumber - 99}</summary>

| №       |         |         |         |         |         |         |         |         |         |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
${table}
</details>`;
}
