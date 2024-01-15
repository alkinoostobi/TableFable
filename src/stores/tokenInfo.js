import {defineStore} from "pinia";
export const useTokenStore = defineStore("token", {
    state: () => ({
        tokens: {
            pcs: {
                'pl1': {
                    'id': 'pl1',
                    'type': 0,
                    'icon': 'https://s3.amazonaws.com/files.d20.io/marketplace/2349674/yebtKpMWfVOqzU379C-KQw/med.png?1648743198602',
                    'size': {
                        'x': 1,
                        'y': 1
                    },
                    'position': {},
                    'rotation': '0deg',
                    'speed': 30,
                    'name': 'Dowr',
                    'class': 'Sorcerer',
                    'dicecolor': 'rgba(36, 79, 38, 0.75)',
                    'race': {
                        'main': 'Goblin',
                        'secondary': 'Tree Dweller',
                    },
                    'alignment': 'LG',
                    'background': 'Detective',
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'stats': {
                        'str': [14, 2],
                        'dex': [12, 1],
                        'con': [10, 0],
                        'int': [12, 1],
                        'wis': [12, 1],
                        'cha': [18, 4],
                    },

                    'skills': {
                        'Arcana': [2, 'int'],
                        'Athletics': [2, 'str'],
                        'Diplomacy': [2, 'cha'],
                        'Intimidate': [2, 'cha'],
                        'Stealth': [2, 'dex'],
                        'Acrobatics	': [0, 'dex'],
                        'Crafting	': [0, 'int'],
                        'Deception': [0, 'cha'],
                        'Lore	': [0, 'int'],
                        'Medicine	': [0, 'wis'],
                        'Nature': [0, 'wis'],
                        'Occultism	': [0, 'int'],
                        'Performance	': [0, 'wis'],
                        'Perception': [2, 'wis'],
                        'Religion	': [0, 'wis'],
                        'Society	': [0, 'int'],
                        'Wisdom	': [0, 'wis'],
                        'Thievery	': [0, 'dex'],
                    },
                    'attacks': [
                        {'name': 'Long spear', 'numbOfDice': 1, 'damage': 6, 'range': 10, 'bonus': 4, 'targets': 1,}
                    ]
                },
                'pl2': {
                    'id': 'pl2',
                    'type': 0,
                    'icon': 'https://travisaw.com/wp-content/uploads/2021/08/token-generator-normal.png',
                    'size': {
                        'x': 1,
                        'y': 1
                    },
                    'position': {},
                    'rotation': '0deg',
                    'speed': 30,
                    'name': 'Skar',
                    'dicecolor': 'rgba(55, 80, 92, 0.75)',
                    'class': 'Sorcerer',
                    'race': {
                        'main': 'Goblin',
                        'secondary': 'Tree Dweller',
                    },
                    'alignment': 'LG',
                    'background': 'Detective',
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'stats': {
                        'str': [14, 2],
                        'dex': [12, 1],
                        'con': [10, 0],
                        'int': [12, 1],
                        'wis': [20, 5],
                        'cha': [18, 4],
                    },

                    'skills': {
                        'Arcana': [2, 'int'],
                        'Athletics': [2, 'str'],
                        'Diplomacy': [2, 'cha'],
                        'Intimidate': [2, 'cha'],
                        'Stealth': [2, 'dex'],
                        'Acrobatics	': [0, 'dex'],
                        'Crafting	': [0, 'int'],
                        'Deception': [0, 'cha'],
                        'Lore	': [0, 'int'],
                        'Medicine	': [0, 'wis'],
                        'Nature': [0, 'wis'],
                        'Occultism	': [0, 'int'],
                        'Performance	': [0, 'wis'],
                        'Perception': [50, 'wis'],
                        'Religion	': [0, 'wis'],
                        'Society	': [0, 'int'],
                        'Wisdom	': [0, 'wis'],
                        'Thievery	': [0, 'dex'],
                    },
                    'attacks': [
                        {'name': 'Long spear', 'numbOfDice': 1, 'damage': 6, 'range': 10, 'bonus': 4, 'targets': 1,}
                    ]
                },
                'pl4': {
                    'id': 'pl4',
                    'type': 0,
                    'icon': 'https://i.pinimg.com/originals/ef/94/95/ef94956ffd550b1fce2ac4bd0f0c72df.png',
                    'size': {
                        'x': 1,
                        'y': 1
                    },
                    'position': {},
                    'rotation': '0deg',
                    'speed': 30,
                    'name': 'Mpampaloui',
                    'class': 'Sorcerer',
                    'race': {
                        'main': 'Goblin',
                        'secondary': 'Tree Dweller',
                    },
                    'dicecolor': 'rgba(243, 165, 5, 0.75)',
                    'alignment': 'LG',
                    'background': 'Detective',
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'stats': {
                        'str': [14, 2],
                        'dex': [12, 1],
                        'con': [10, 0],
                        'int': [12, 1],
                        'wis': [14, 2],
                        'cha': [18, 4],
                    },

                    'skills': {
                        'Arcana': [2, 'int'],
                        'Athletics': [2, 'str'],
                        'Diplomacy': [2, 'cha'],
                        'Intimidate': [2, 'cha'],
                        'Stealth': [2, 'dex'],
                        'Acrobatics	': [0, 'dex'],
                        'Crafting	': [0, 'int'],
                        'Deception': [0, 'cha'],
                        'Lore	': [0, 'int'],
                        'Medicine	': [0, 'wis'],
                        'Nature': [0, 'wis'],
                        'Occultism	': [0, 'int'],
                        'Performance	': [0, 'wis'],
                        'Perception': [4, 'wis'],
                        'Religion	': [0, 'wis'],
                        'Society	': [0, 'int'],
                        'Wisdom	': [0, 'wis'],
                        'Thievery	': [0, 'dex'],
                    },
                    'attacks': [
                        {'name': 'Long spear', 'numbOfDice': 1, 'damage': 6, 'range': 10, 'bonus': 4, 'targets': 1,}
                    ]
                }, 'pl3': {
                    'id': 'pl3',
                    'type': 0,
                    'icon': 'https://i.pinimg.com/originals/ef/94/95/ef94956ffd550b1fce2ac4bd0f0c72df.png',
                    'size': {
                        'x': 1,
                        'y': 1
                    },
                    'position': {},
                    'rotation': '0deg',
                    'speed': 30,
                    'name': 'Blor',
                    'class': 'Sorcerer',
                    'race': {
                        'main': 'Goblin',
                        'secondary': 'Tree Dweller',
                    },
                    'dicecolor': 'rgba(118, 60, 40, 0.75)',
                    'alignment': 'LG',
                    'background': 'Detective',
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'stats': {
                        'str': [14, 2],
                        'dex': [12, 1],
                        'con': [10, 0],
                        'int': [12, 1],
                        'wis': [14, 2],
                        'cha': [18, 4],
                    },

                    'skills': {
                        'Arcana': [2, 'int'],
                        'Athletics': [2, 'str'],
                        'Diplomacy': [2, 'cha'],
                        'Intimidate': [2, 'cha'],
                        'Stealth': [2, 'dex'],
                        'Acrobatics	': [0, 'dex'],
                        'Crafting	': [0, 'int'],
                        'Deception': [0, 'cha'],
                        'Lore	': [0, 'int'],
                        'Medicine	': [0, 'wis'],
                        'Nature': [0, 'wis'],
                        'Occultism	': [0, 'int'],
                        'Performance	': [0, 'wis'],
                        'Perception': [4, 'wis'],
                        'Religion	': [0, 'wis'],
                        'Society	': [0, 'int'],
                        'Wisdom	': [0, 'wis'],
                        'Thievery	': [0, 'dex'],
                    },
                    'attacks': [
                        {'name': 'Long spear', 'numbOfDice': 1, 'damage': 6, 'range': 10, 'bonus': 4, 'targets': 1,}
                    ]
                },
            },
            npcs: {
                'mon1': {
                    'id': 'mon1',
                    'type': 1,
                    'icon': 'https://i.pinimg.com/originals/ff/9c/48/ff9c4808809368fbd58106140977708b.png',
                    'position': {},
                    'rotation': '45',
                    'speed': 30,
                    'size': {
                        'x': 5,
                        'y': 5
                    },
                    'name': 'Large Plant',
                    'level': 3,
                    'perception': 15,
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'attacks': [
                        {'bonus': 14, 'numbOfDice': 1, 'damage': 6, 'range': 5, 'targets': 1,}
                    ]
                },
                'mon2': {
                    'id': 'mon2',
                    'type': 1,
                    'icon': 'https://s3.amazonaws.com/files.d20.io/marketplace/2222383/DSzCtKYufMLb9EinYYX2ug/med.png?1642080635715',
                    'position': {},
                    'rotation': '90deg',
                    'speed': 30,
                    'size': {
                        'x': 3,
                        'y': 3
                    },
                    'name': 'Large Plant',
                    'level': 3,
                    'perception': 12,
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'attacks': [
                        {'bonus': 14, 'numbOfDice': 1, 'damage': 6, 'range': 5, 'targets': 1,}
                    ]
                },
                'mon3': {
                    'id': 'mon3',
                    'type': 1,
                    'icon': 'https://i.imgur.com/amMQC3f.png',
                    'position': {},
                    'rotation': '0deg',
                    'speed': 30,
                    'size': {
                        'x': 2,
                        'y': 2
                    },
                    'name': 'Large Plant',
                    'level': 3,
                    'perception': 24,
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'attacks': [
                        {'bonus': 14, 'numbOfDice': 1, 'damage': 6, 'range': 5, 'targets': 1,}
                    ]
                },
                'mon4': {
                    'id': 'mon4',
                    'type': 1,
                    'icon': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04236ba8-38d0-4177-a92e-e9ece2becc59/de4sdvg-40333da7-424b-4d34-9ad8-a873cebb656c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA0MjM2YmE4LTM4ZDAtNDE3Ny1hOTJlLWU5ZWNlMmJlY2M1OVwvZGU0c2R2Zy00MDMzM2RhNy00MjRiLTRkMzQtOWFkOC1hODczY2ViYjY1NmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3lbgVF1ID0VcRaf3ruQrbX0gB9LiIDjyW9vz6HZK7lM',
                    'position': {},
                    'rotation': '30deg',
                    'speed': 30,
                    'size': {
                        'x': 2,
                        'y': 2
                    },
                    'name': 'Large Plant',
                    'level': 3,
                    'perception': 2,
                    'defense': {
                        'ac': 15,
                        'hp': 12,
                        'fort': 15,
                        'reflex': 12,
                        'will': 13,
                    },
                    'attacks': [
                        {'bonus': 14, 'numbOfDice': 1, 'damage': 6, 'range': 5, 'targets': 1,}
                    ]
                },
            }
        },
    }),
    actions: {
        setToken(tokenId, tokenCat, tokenInfo) {
            this.tokens[tokenCat][tokenId] = tokenInfo;
        },
        getToken(tokenId, tokenCat) {
            return this.tokens[tokenCat][tokenId];
        },
        getCategoryById(objectId) {
            const pcsKeys = Object.keys(this.tokens.pcs);
            const npcsKeys = Object.keys(this.tokens.npcs);

            if (pcsKeys.includes(objectId)) {
                return 'pcs';
            } else if (npcsKeys.includes(objectId)) {
                return 'npcs';
            } else {
                return 'Object not found';
            }
        },
    },
    getters: {
        getAllTokens() {
            return this.tokens;
        },
    }
});
