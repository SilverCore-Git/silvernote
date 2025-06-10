import * as fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import unzipper from 'unzipper';
import { exec } from 'child_process';
import { promisify } from 'util';

const front_path: string = path.join('dist', 'app', 'public');
const back_path: string = path.join('dist', 'app');
const temp_dir: string = path.join('dist', 'temp');

const execAsync = promisify(exec);

async function command(command: string): Promise<string> {

    try {

        const { stdout, stderr } = await execAsync(command, {
            cwd: path.join('dist', 'app'),
            encoding: 'utf-8'
        });
        
        if (stderr) {
            console.warn('Avertissement:', stderr);
        }
        
        return stdout.trim();

    } catch (error) {
        console.error('Erreur lors de l\'exécution:', error);
        throw error;
    }

}

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

function launch_app() {
    command("npm i");
    //command("npm stop");
    command("npm start");
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
    const base: string = 'https://github.com/SilverCore-Git/silvernote/releases/download/';
    const tag: string = tag_name;
    const version: string = tag.slice(1);
    const front_url: string = new URL(`${tag}/silvernote-front-${version}.zip`, base).href;
    const front_zipName: string = `silvernote-front-${version}.zip`;
    const back_url: string = new URL(`${tag}/silvernote-back-${version}.zip`, base).href;
    const back_zipName: string = `silvernote-back-${version}.zip`;

    if (fs.existsSync(path.join(back_path, 'package.json'))) {

        const { version } = await import(`${back_path}/package.json`, {
            assert: { type: "json" }
        });

        if (`v${version}` !== tag_name) {
            
            await download(back_url, back_zipName);

            await unzip(path.join(temp_dir, back_zipName), path.join(temp_dir, `silvernote-back-${version}`));

            try {

                const items: string[] = await fs.promises.readdir(path.join(temp_dir, `silvernote-back-${version}/dist`));

                for (const item of items) {

                    const sourcePath = path.join(path.join(temp_dir, `silvernote-back-${version}/dist`), item);
                    const destPath = path.join(back_path, item);
                    
                    await fs.promises.cp(sourcePath, destPath, { recursive: true });
                    
                    await fs.promises.rm(sourcePath, { recursive: true, force: true });

                }

            }
            catch (err) {
                throw new Error(`Erreur lors du déplacement du dossier : ${err}`);
            }

        }

    }
    else 
    {

        await download(back_url, back_zipName);

        await unzip(path.join(temp_dir, back_zipName), path.join(temp_dir, `silvernote-back-${version}`));

        try {

            const items: string[] = await fs.promises.readdir(path.join(temp_dir, `silvernote-back-${version}/dist`));

            for (const item of items) {

                const sourcePath = path.join(path.join(temp_dir, `silvernote-back-${version}/dist`), item);
                const destPath = path.join(back_path, item);
                    
                await fs.promises.cp(sourcePath, destPath, { recursive: true });
                    
                await fs.promises.rm(sourcePath, { recursive: true, force: true });

            }

        }
        catch (err) {
            throw new Error(`Erreur lors du déplacement du dossier : ${err}`);
        }

    }




    if (fs.existsSync(path.join(front_path, 'package.json'))) {

        const { version } = await import(`${front_path}/package.json`, {
            assert: { type: "json" }
        });

        if (`v${version}` !== tag_name) {
            
            await download(front_url, front_zipName);

            await unzip(path.join(temp_dir, front_zipName),  path.join(temp_dir, `silvernote-front-${version}`));

            try {

                const items: string[] = await fs.promises.readdir(path.join(temp_dir, `silvernote-front-${version}/dist`));

                for (const item of items) {

                    const sourcePath = path.join(path.join(temp_dir, `silvernote-front-${version}/dist`), item);
                    const destPath = path.join(front_path, item);
                    
                    await fs.promises.cp(sourcePath, destPath, { recursive: true });
                    
                    await fs.promises.rm(sourcePath, { recursive: true, force: true });

                }

            }
            catch (err) {
                throw new Error(`Erreur lors du déplacement du dossier : ${err}`);
            }

        }

    }
    else 
    {

        await download(front_url, front_zipName);

        await unzip(path.join(temp_dir, front_zipName), path.join(temp_dir, `silvernote-front-${version}`));

        try {

            const items: string[] = await fs.promises.readdir(path.join(temp_dir, `silvernote-front-${version}/dist`));

            for (const item of items) {

                const sourcePath = path.join(path.join(temp_dir, `silvernote-front-${version}/dist`), item);
                const destPath = path.join(front_path, item);
                    
                await fs.promises.cp(sourcePath, destPath, { recursive: true });
                    
                await fs.promises.rm(sourcePath, { recursive: true, force: true });

            }

        }
        catch (err) {
            throw new Error(`Erreur lors du déplacement du dossier : ${err}`);
        }

    }


};

app().catch((err) => {
    console.error("Error on runing script :", err);
})

launch_app();