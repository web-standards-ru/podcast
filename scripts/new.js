import fs from "node:fs";

const episode = Number(process.env.npm_config_episode);

if (!episode) {
	console.error(
		"Нужен номер эпизода, например: npm run new --episode=417"
	);
	process.exit(1);
}

// Добавляет эпизод в README
function episodeLinkString(episode) {
	return `[${episode}]: src/episodes/${episode}/index.md`;
}

const readmeContent = fs
	.readFileSync("README.md")
	.toString()
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
