// Define asset references with aliases and sources for images
export const ASSETS = [
    { alias: "background",      src: "assets/environment/background.jpg" },
    { alias: "button",          src: "assets/environment/button.png" },
    { alias: "frame",           src: "assets/environment/frame.png" },
    { alias: "highlight",       src: "assets/environment/highlight.png" },
    { alias: "interface",       src: "assets/environment/interface.png" },
    { alias: "minus",           src: "assets/environment/minus.png" },
    { alias: "payout",          src: "assets/environment/payout.png" },
    { alias: "popup",           src: "assets/environment/popup.png" },
    { alias: "plus",            src: "assets/environment/plus.png" },
    { alias: "reel",            src: "assets/environment/reel.png" },
    //#region symbol assests
    { alias: "apple",           src: "assets/symbols/apple.png" },
    { alias: "cherry",          src: "assets/symbols/cherry.png" },
    { alias: "orange",          src: "assets/symbols/orange.png" },
    { alias: "plum",            src: "assets/symbols/plum.png" },
    { alias: "strawberry",      src: "assets/symbols/strawberry.png" },
    { alias: "watermelon",      src: "assets/symbols/watermelon.png" },
    //#endregion
];

// Symbol payouts and connections
export const SYMBOLS = [
    { index: 0, base: "cherry",     payout: { 2: 5, 3: 10 } },
    { index: 1, base: "watermelon", payout: { 2: 2, 3: 5 } },
    { index: 2, base: "strawberry", payout: { 2: 2, 3: 5 } },
    { index: 3, base: "orange",     payout: { 2: 1, 3: 3 } },
    { index: 4, base: "apple",      payout: { 2: 1, 3: 3 } },
    { index: 5, base: "plum",       payout: { 2: 1, 3: 3 } }
];

// Winning reel indices and patterns. Simulation of back-end response.
export const WINNING_REEL_INDICES = [
    { index: 2,  symIndex: 3, count: 2 },
    { index: 3,  symIndex: 3, count: 2 },
    { index: 4,  symIndex: 3, count: 2 },
    { index: 5,  symIndex: 3, count: 2 },
    { index: 6,  symIndex: 3, count: 2 },
    { index: 7,  symIndex: 3, count: 2 },
    { index: 10, symIndex: 0, count: 2 },
    { index: 12, symIndex: 0, count: 2 },
    { index: 13, symIndex: 1, count: 2 },
    { index: 14, symIndex: 1, count: 2 },
    { index: 15, symIndex: 1, count: 3 },
    { index: 16, symIndex: 1, count: 2 },
    { index: 17, symIndex: 1, count: 2 },
    { index: 18, symIndex: 0, count: 2 },
    { index: 20, symIndex: 0, count: 2 },
    { index: 21, symIndex: 3, count: 2 },
    { index: 30, symIndex: 1, count: 2 },
    { index: 31, symIndex: 1, count: 3 },
    { index: 32, symIndex: 1, count: 2 },
    { index: 34, symIndex: 0, count: 2 },
    { index: 35, symIndex: 3, count: 2 },
    { index: 36, symIndex: 0, count: 2 },
    { index: 37, symIndex: 3, count: 2 },
    { index: 39, symIndex: 3, count: 2 },
    { index: 40, symIndex: 3, count: 2 },
    { index: 41, symIndex: 3, count: 2 },
    { index: 45, symIndex: 0, count: 2 },
    { index: 46, symIndex: 0, count: 3 },
    { index: 47, symIndex: 0, count: 2 },
    { index: 50, symIndex: 1, count: 2 },
    { index: 51, symIndex: 1, count: 3 },
    { index: 52, symIndex: 1, count: 2 },
    { index: 57, symIndex: 3, count: 2 },
    { index: 58, symIndex: 3, count: 2 },
    { index: 60, symIndex: 1, count: 2 },
    { index: 63, symIndex: 0, count: 2 },
    { index: 65, symIndex: 0, count: 2 },
    { index: 66, symIndex: 0, count: 2 },
    { index: 67, symIndex: 0, count: 3 },
    { index: 68, symIndex: 0, count: 2 },
    { index: 69, symIndex: 3, count: 2 },
    { index: 70, symIndex: 3, count: 3 },
    { index: 71, symIndex: 3, count: 3 },
    { index: 72, symIndex: 3, count: 2 },
    { index: 73, symIndex: 4, count: 2 },
    { index: 74, symIndex: 4, count: 2 },
    { index: 77, symIndex: 1, count: 2 },
    { index: 81, symIndex: 3, count: 2 },
    { index: 83, symIndex: 3, count: 2 },
    { index: 84, symIndex: 3, count: 2 },
    { index: 85, symIndex: 3, count: 3 },
    { index: 86, symIndex: 3, count: 2 },
    { index: 87, symIndex: 3, count: 2 },
    { index: 88, symIndex: 3, count: 2 },
    { index: 89, symIndex: 3, count: 2 },
    { index: 90, symIndex: 0, count: 2 },
    { index: 91, symIndex: 0, count: 3 },
    { index: 92, symIndex: 0, count: 2 },
    { index: 96, symIndex: 3, count: 2 },
];

// Reel setup for the game
export const REEL_SET = [
    0, 4, 0, 2, 3, 3, 1, 3, 3, 5, 3, 0, 5, 0, 1, 0, 1, 1, 1, 0, 1, 0, 3, 0, 3, 5, 0, 3, 1, 4, 3, 0, 1, 1,
    1, 0, 3, 0, 3, 0, 3, 1, 3, 3, 4, 1, 3, 0, 0, 0, 3, 4, 1, 1, 1, 0, 4, 5, 0, 3, 3, 1, 4, 1, 0, 4, 0, 1,
    0, 0, 0, 3, 3, 3, 3, 4, 4, 3, 1, 4, 1, 0, 3, 1, 3, 0, 3, 3, 3, 1, 3, 3, 0, 0, 0, 1, 5, 3, 1, 3, 0, 4
];

// Bet range available for the player to choose from
export const BET_RANGE = [1, 2, 3, 4, 5];

// Enum for bet actions (increase or decrease)
export enum BET_COMMANDS {
    increase = "increase",
    decrease = "decrease"
}

// Payout positions on the screen (coordinates for payout symbols)
export const PAYOUT_POSITIONS = [
    { x: 640, y: 134 },
    { x: 640, y: 300 },
    { x: 640, y: 468 }
];