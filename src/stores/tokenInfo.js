import { defineStore } from "pinia";

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
                    'name': 'Dowr',
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
                        'str': 14,
                        'dex': 12,
                        'con': 10,
                        'int': 12,
                        'wis': 12,
                        'cha': 18
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
                        'Religion	': [0, 'wis'],
                        'Society	': [0, 'int'],
                        'Wisdom	': [0, 'wis'],
                        'Thievery	': [0, 'dex'],
                    },
                    'weapons': [
                        { 'name': 'Long spear', 'damage': 6, 'range': 10 }
                    ]
                }
            },
            npcs: {
                'mon1': {
                    'id': 'mon1',
                    'type': 0,
                    'icon': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/32b5ea72-1008-455c-a164-8604ac88bb47/df5yi6k-fb5e6344-0619-4c93-99e4-90c0371cb961.png/v1/fill/w_330,h_330/awakened_shrub_token_by_caeora_df5yi6k-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMwIiwicGF0aCI6IlwvZlwvMzJiNWVhNzItMTAwOC00NTVjLWExNjQtODYwNGFjODhiYjQ3XC9kZjV5aTZrLWZiNWU2MzQ0LTA2MTktNGM5My05OWU0LTkwYzAzNzFjYjk2MS5wbmciLCJ3aWR0aCI6Ijw9MzMwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.EeZ_UNU9buhmneBk9TVc_5VOeg5aMc0c8j6hZWTKx10',
                    'position': {},
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
                        { 'bonus': 14, 'damage': [6, 5] }
                    ]
                }
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
        getAllTokens() {
            return this.tokens;
        },
    },
});