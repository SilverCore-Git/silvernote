import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import unzipper from 'unzipper';

const front_path: string = path.join('dist', 'app', 'dist');
const back_path: string = path.join('dist', 'app');
const temp_dir: string = path.join('dist', 'temp');

async function download(url: string, name: string): Promise<void> {

    console.log(url)
    const response: any = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Node.js script)',
            'Accept': 'application/octet-stream'
        }
    });
    if (!response.ok) throw new Error(`Erreur téléchargement: ${response.statusText}`);

    const fileStream = fs.createWriteStream(`${temp_dir}/${name}`);

    await new Promise<void>((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', () => resolve());
    });

}

async function unzip(path: string, outpath: string) {

    await fs.createReadStream(path)
        .pipe(unzipper.Extract({ path: outpath }))
        .promise();

    fs.unlinkSync(path);

}

async function app(): Promise<void> {

    console.log("Démarage du serveur...");

    if (!fs.existsSync(back_path)) {
        console.log('Creating dir : ', back_path);
        fs.mkdirSync(back_path);
    }

    if (!fs.existsSync(front_path)) {
        console.log('Creating dir : ', front_path);
        fs.mkdirSync(front_path);
    }

    if (!fs.existsSync(temp_dir)) {
        console.log('Creating dir : ', temp_dir);
        fs.mkdirSync(temp_dir);
    }


    const latest_realise: any = await fetch('https://api.github.com/repos/silvercore-git/silvernote/releases/latest').then(res => res.json());

    const tag_name: string = latest_realise.tag_name;
    const base = 'https://github.com/SilverCore-Git/silvernote/releases/download/';
    const tag = tag_name;
    const version = tag.slice(1);
    const url = new URL(`${tag}/silvernote-front-${version}.zip`, base).href;
    const zipName = `silvernote-front-${version}.zip`;

    if (fs.existsSync(path.join(back_path, 'package.json'))) {

        const { version } = await import(`${back_path}/package.json`, {
            assert: { type: "json" }
        });

        if (`v${version}` !== latest_realise.tag_name) {
            

        }
        
    }

    if (fs.existsSync(path.join(front_path, 'package.json'))) {

        const { version } = await import(`${front_path}/package.json`, {
            assert: { type: "json" }
        });

        if (`v${version}` !== tag_name) {
            
            await download(url, zipName);

            await unzip(path.join(temp_dir, zipName), front_path);

        }

    }
    else 
    {

        await download(url, zipName);

        await unzip(path.join(temp_dir, zipName), front_path);

    }


};

app().catch((err) => {
    console.error("Error on runing script :", err);
})