
const db = {
  notes: [
    { id: 1, pinned: false, simply_edit: false, title: "1 Ma note trop cool", content: "Olalalalala je ne suis pas un psychopathe", "date": "01 Janvier 2025", tags: ["perso"] },
    { id: 2, pinned: false, simply_edit: false, title: "Note 2", content: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "02 Janvier 2025", tags: ["perso", "ar", "pa"] },
    { id: 3, pinned: false, simply_edit: false, title: "Lorem Ipsum", content: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "03 Janvier 2025", tags: ["perso"] },
    { id: 4, pinned: false, simply_edit: false, title: "Note 4", content: "Contenu de la note 4", "date": "04 Janvier 2025", tags: ["perso"] },
    { id: 5, pinned: false, simply_edit: false, title: "Note 5", content: "5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "05 Janvier 2025", tags: ["perso"] },
    { id: 6, pinned: false, simply_edit: false, title: "Note 6", content: "6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "06 Janvier 2025", tags: ["perso"] },
    { id: 7, pinned: false, simply_edit: false, title: "Note 7", content: "7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "07 Janvier 2025", tags: ["perso"] },
    { id: 8, pinned: true, simply_edit: false, title: "Note 8", content: "8 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "08 Janvier 2025", tags: ["perso"] },
    { id: 9, pinned: false, simply_edit: false, title: "Note 9", content: "9 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date": "09 Janvier 2025", tags: ["perso"] },
    { id: 10, pinned: false, simply_edit: false, title: "Note 10", content: "Contenu de la note 10", "date": "10 Janvier 2025", tags: ["ar"] },
    { id: 11, pinned: false, simply_edit: false, title: "Note 11", content: "Contenu de la note 11", "date": "11 Janvier 2025", tags: ["ar"] },
    { id: 12, pinned: false, simply_edit: true, title: "Note 12", content: "12 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "12 Janvier 2025", tags: ["ar"] },
    { id: 13, pinned: false, simply_edit: false, title: "Note 13", content: "13 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "13 Janvier 2025", tags: ["ar"] },
    { id: 14, pinned: false, simply_edit: false, title: "Note 14", content: "14 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "14 Janvier 2025", tags: ["perso"] },
    { id: 15, pinned: false, simply_edit: false, title: "Note 15", content: "15 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "15 Janvier 2025", tags: ["pa"] },
    { id: 16, pinned: false, simply_edit: false, title: "Note 16", content: "16 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "16 Janvier 2025", tags: ["pa"] },
    { id: 17, pinned: false, simply_edit: false, title: "Note 17", content: "17 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "17 Janvier 2025", tags: ["pa"] },
    { id: 18, pinned: false, simply_edit: false, title: "Note 18", content: "18 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "date": "18 Janvier 2025", tags: ["pa"] },
    { id: 19, pinned: false, simply_edit: false, title: "Note 19", content: "Contenu de la note 19", "date": "19 Janvier 2025", tags: ["perso"] },
    { id: 20, pinned: false, simply_edit: false, title: "Note 20", content: "Contenu de la note 20", "date": "20 Janvier 2025", tags: ["d"] }
  ],
  tags: [
    { id: 1, name: "perso", active: false },
    { id: 2, name: "ar", active: false },
    { id: 3, name: "pa", active: false },
    { id: 4, name: "d", active: false }
  ]
}


const info_message = (): { message: string, title: string, btn: boolean, href: string } => {
    return { 
              message: "SilverNote est actuelement en maintenance, l'app fonctionera en local seulement pendant cet periode.", 
              title: "Maintenance",
              btn: true,
              href: "https://www.silvercore.fr"
            };
};



export default {
    db,
    info_message
}