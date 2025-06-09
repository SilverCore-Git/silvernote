import fs from 'fs';
import path from 'path';


async function app(): Promise<void> {

    console.log("Script lancé");


};

app().catch((err) => {
    console.error("Erreur dans l'application :", err);
});