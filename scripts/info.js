import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function runCommandSync(bin, args) {
	return execFileSync(bin, args, {
		encoding: 'utf-8',
	});
}

function buildMp3(episodeNumber, inputFolder, outputFolder) {
	return runCommandSync('ffmpeg', [
		'-i', path.join(inputFolder, `${episodeNumber}.wav`),
		'-nostats',
		'-loglevel', '0',
		'-hide_banner',
		'-codec:a', 'libmp3lame',
		'-b:a', '128k',
		path.join(outputFolder, `${episodeNumber}.mp3`),
	]);
}

function buildChapters(inputFile) {
	return runCommandSync('ffprobe', [
		'-i', inputFile,
		'-loglevel', '0',
		'-hide_banner',
		'-print_format', 'json',
		'-show_chapters',
		'-pretty',
	]);
}

function writeChaptersIntoFile(chapters, filePath) {
	const fileStream = fs.createWriteStream(filePath);

	function parseTime(str) {
		return `0${str}`.split('.')[0];
	}

	const newArr = chapters.map(chapter => {
		const startTime = parseTime(chapter.start_time);
		const title = chapter.tags.title;
		return `${startTime} ${title}`;
	});

	newArr.forEach(line => {
		fileStream.write(line);
		fileStream.write('\n');
	});

	fileStream.close();
}

const episodeNumber = process.argv[2];

if (!episodeNumber) {
	console.log('No input number');
	process.exit(1);
}

const baseDirectory = 'src';

fs.mkdirSync(
	path.join(baseDirectory, 'mp3'),
	{ recursive: true }
);

buildMp3(episodeNumber, path.join(baseDirectory, 'wav'), path.join(baseDirectory, 'mp3'));

const json = buildChapters(path.join(baseDirectory, 'mp3', `${episodeNumber}.mp3`));

const parsedJson = JSON.parse(json);

if (!parsedJson.chapters) {
	console.log('No chapters in input file');
	process.exit(1);
}

fs.mkdirSync(
	path.join(baseDirectory, 'episodes', episodeNumber),
	{ recursive: true }
);

writeChaptersIntoFile(
	parsedJson.chapters,
	path.join(baseDirectory, 'episodes', episodeNumber, 'index.txt')
);
