export interface SettingOption {
  id: string;
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
    { id: "", name: "Activer les notifications", type: "checkbox", active: false },
    { id: "", name: "Langue", type: "checkbox", active: false }
  ],
  avancé: [
    { id: "dev_mode", name: "Mode développeur", type: "checkbox", active: true }
  ],
  dev_mode: [
    { id: "hitbox", name: "Activer les hitbox", type: "checkbox", active: true },
    { id: "", name: "Afficher la console", type: "checkbox", active: false }
  ]
};

const hitbox: boolean = settings.dev_mode.find(p => p.id == 'hitbox')?.active ?? false;

export {
    settings,
    hitbox
}