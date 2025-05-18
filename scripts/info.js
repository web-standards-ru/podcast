import { argv, exit } from 'node:process';
import fs from 'node:fs';

if (!argv[2]) {
	console.log('No input number');
	process.exit(1);
}

const number = argv[2];

let parsedJson;

try {
	const jsonString = fs.readFileSync(`${number}.json`, 'utf8');
	parsedJson = JSON.parse(jsonString);
} catch (err) {
	console.log('File read failed:', err);
	exit(1);
}

if (!parsedJson.chapters) {
	console.log('No chapters in input file');
	exit(1);
}

const newArr = parsedJson.chapters.map(chapter => {
	const startTime = parseTime(chapter.start_time);
	const title = chapter.tags.title;
	return `${startTime} ${title}`;
});

const out = fs.createWriteStream(`./${number}.txt`);

newArr.forEach(line => {
	out.write(line);
	out.write('\n');
});

out.end(() => {
	exit(0);
});

function parseTime(str) {
	return `0${str}`.split('.')[0];
}
