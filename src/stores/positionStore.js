import { defineStore } from "pinia";
import { useTokenStore } from "./tokenInfo";
import { pxTranslate } from "./px2feet";

const tokenInfo = useTokenStore();
const sizetranslate = pxTranslate();
export const usePositionStore = defineStore("position", {
    state: () => ({
        positions: {},
    }),
    actions: {
        setPosition(tokenIndex, position) {
            this.positions[tokenIndex] = position;
        },
        getPosition(tokenIndex) {
            return this.positions[tokenIndex];
        },
        tokenDistance(tokenA, tokenB) {
            return Math.sqrt((tokenA.x - tokenB.x) ** 2 + (tokenA.y - tokenB.y) ** 2);
        },
        canTokensReach(tokenA, tokenB, distance) {
            const sizeA = {
                x: tokenInfo.tokens[tokenInfo.getCategoryById(tokenA)][tokenA].size.x * 5,
                y: tokenInfo.tokens[tokenInfo.getCategoryById(tokenA)][tokenA].size.y * 5,
            };

            const sizeB = {
                x: tokenInfo.tokens[tokenInfo.getCategoryById(tokenB)][tokenB].size.x * 5,
                y: tokenInfo.tokens[tokenInfo.getCategoryById(tokenB)][tokenB].size.y * 5,
            };

            const leftTopA = this.positions[tokenA];
            const leftTopB = this.positions[tokenB];

            const distanceInPixels = sizetranslate.feetTranslator(distance);

            // Calculate the corners and middle points of the sides for tokenA
            const cornersA = [
                { x: leftTopA.x, y: leftTopA.y },
                { x: leftTopA.x + sizetranslate.feetTranslator(sizeA.x), y: leftTopA.y },
                { x: leftTopA.x, y: leftTopA.y + sizetranslate.feetTranslator(sizeA.y) },
                { x: leftTopA.x + sizetranslate.feetTranslator(sizeA.x), y: leftTopA.y + sizetranslate.feetTranslator(sizeA.y) }
            ];
            const middleA = [
                { x: leftTopA.x + sizetranslate.feetTranslator(sizeA.x) / 2, y: leftTopA.y },
                { x: leftTopA.x + sizetranslate.feetTranslator(sizeA.x) / 2, y: leftTopA.y + sizetranslate.feetTranslator(sizeA.y) },
                { x: leftTopA.x, y: leftTopA.y + sizetranslate.feetTranslator(sizeA.y) / 2 },
                { x: leftTopA.x + sizetranslate.feetTranslator(sizeA.x), y: leftTopA.y + sizetranslate.feetTranslator(sizeA.y) / 2 }
            ];

            // Calculate the corners and middle points of the sides for tokenB
            const cornersB = [
                { x: leftTopB.x, y: leftTopB.y },
                { x: leftTopB.x + sizetranslate.feetTranslator(sizeB.x), y: leftTopB.y },
                { x: leftTopB.x, y: leftTopB.y + sizetranslate.feetTranslator(sizeB.y) },
                { x: leftTopB.x + sizetranslate.feetTranslator(sizeB.x), y: leftTopB.y + sizetranslate.feetTranslator(sizeB.y) }
            ];
            const middleB = [
                { x: leftTopB.x + sizetranslate.feetTranslator(sizeB.x) / 2, y: leftTopB.y },
                { x: leftTopB.x + sizetranslate.feetTranslator(sizeB.x) / 2, y: leftTopB.y + sizetranslate.feetTranslator(sizeB.y) },
                { x: leftTopB.x, y: leftTopB.y + sizetranslate.feetTranslator(sizeB.y) / 2 },
                { x: leftTopB.x + sizetranslate.feetTranslator(sizeB.x), y: leftTopB.y + sizetranslate.feetTranslator(sizeB.y) / 2 }
            ];

            // Check if any corner or middle point of tokenA is within the specified distance of any corner or middle point of tokenB
            for (const cornerA of[...cornersA, ...middleA]) {
                for (const cornerB of[...cornersB, ...middleB]) {
                    const distanceBetweenCorners = Math.sqrt(Math.pow(cornerA.x - cornerB.x, 2) + Math.pow(cornerA.y - cornerB.y, 2));
                    if (distanceBetweenCorners <= distanceInPixels) {
                        return true;
                    }
                }
            }

            return false;
        }
    },
});