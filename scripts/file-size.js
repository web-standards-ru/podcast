import fs from 'node:fs';
import path from 'node:path';
import getMP3Duration from 'get-mp3-duration';

function isFileExist(filePath) {
	try {
		fs.statSync(filePath);
		return true;
	} catch {
		return false;
	}
}

const folderDataPath = path.join('src', 'episodes');
const folderMediaPath = path.join('src', 'mp3');

const dir = fs.opendirSync(folderDataPath, {
	encoding: 'utf-8',
	withFileTypes: true,
});

try {
	let item = null;

	while ((item = dir.readSync())) {
		if (!item.isDirectory()) {
			continue;
		}

		const episodeFolder = path.join(item.path, item.name);
		const dataFilePath = path.join(episodeFolder, 'index.json');

		if (isFileExist(dataFilePath)) {
			continue;
		}

		const mediaFilePath = path.join(folderMediaPath, item.name + '.mp3');

		if (!isFileExist(mediaFilePath)) {
			console.log(`Файл '${mediaFilePath}' не найден`);
			continue;
		}

		const fileBuffer = fs.readFileSync(mediaFilePath);
		const fileSize = fileBuffer.byteLength;
		const duration = getMP3Duration(fileBuffer);

		const dataToSave = JSON.stringify({ fileSize, duration }, null, '\t');
		fs.writeFileSync(dataFilePath, dataToSave, 'utf-8');
	}
} finally {
	dir.closeSync();
}
