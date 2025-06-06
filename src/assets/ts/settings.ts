export interface SettingOption {
  name: string;
  type: string;
  active: boolean;
}

export interface Settings {
  généraux: SettingOption[];
  avancé: SettingOption[];
  dev_mode: SettingOption[];
}

const settings: Settings = {
  généraux: [
    { name: "Nom d'utilisateur", type: "checkbox", active: false },
    { name: "Activer les notifications", type: "checkbox", active: false },
    { name: "Langue", type: "checkbox", active: false }
  ],
  avancé: [
    { name: "Taille du cache", type: "checkbox", active: false },
    { name: "Mode sécurisé", type: "checkbox", active: false },
    { name: "Adresse IP", type: "checkbox", active: false },
    { name: "Mode développeur", type: "checkbox", active: true }
  ],
  dev_mode: [
    { name: "Activer le debug", type: "checkbox", active: false },
    { name: "Afficher la console", type: "checkbox", active: false }
  ]
};



export {
    settings
}