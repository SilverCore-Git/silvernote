
interface Settings {
    divers: { name: string, type: string }[],
    advenced: { name: string, type: string }[],
    dev_mod: { name: string, type: string }[],
}

const settings: Settings = {
  divers: [
    { name: "Nom d'utilisateur", type: "text" },
    { name: "Activer les notifications", type: "checkbox" },
    { name: "Langue", type: "select" }
  ],
  advenced: [
    { name: "Taille du cache", type: "number" },
    { name: "Mode sécurisé", type: "checkbox" },
    { name: "Adresse IP", type: "text" }
  ],
  dev_mod: [
    { name: "Activer le debug", type: "checkbox" },
    { name: "Afficher la console", type: "checkbox" },
    { name: "Mode développeur", type: "switch" }
  ]
}


export {
    settings
}