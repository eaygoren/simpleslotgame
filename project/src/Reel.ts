import * as PIXI from "pixi.js";
import gsap from "gsap";
import { REEL_SET, SYMBOLS, WINNING_REEL_INDICES } from "./Configs";
import { EventNames } from "./EventBus";
import { Symbol } from "./Symbol";

export class Reel extends PIXI.Container {
    private _app: PIXI.Application;

    private _reelContainer: PIXI.Container;
    private _reel: PIXI.Sprite;
    private _mask: PIXI.Graphics;
    private _symbols: Symbol[] = [];
    private _excess: number = 2; // Extra symbols that appear above and below the reel area
    private _data: number; // Data representing the starting symbol index
    private _col: number; // Number of columns (reels)
    private _row: number; // Number of rows (symbols per reel)
    private _isSpinning: boolean = false; // State of the spin
    private _isDataReceived: boolean = false; // Whether data has been received for the reels
    private _timeout: number; // Get timeout ID for skip

    private readonly END_POINT: number = 425; // Final position of the reel after spin
    private readonly BACK_POINT: number = -55; // Starting position for the reel to spin from
    private readonly SYMBOL_START_POINT: number = -335; // Excess point
    private readonly SYMBOL_GAP: number = 28; // Gap between symbols
    private readonly TWEEN_START_DURATION: number = 0.2; // Duration for initial reel movement
    private readonly TWEEN_LOOP_DURATION: number = 0.075; // Duration for reel loop

    constructor(app: any, col: number, row: number) {
        super();

        this._app = app;
        this._col = col;
        this._row = row;

        this.onLoad();
    }

    // Initialize the component by creating the reels and adding event listeners
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Create the reels, symbols, and set their positions
    private create() {
        let randomSymbolIndex = Math.floor(Math.random() * (REEL_SET.length - (this._row + this._excess)));

        // Create mask for the reel to limit symbol display area
        this._mask = new PIXI.Graphics();
        this._mask.beginPath().rect(536, 38, 207, 525).fill({ color: 0xFAFAFA, alpha: 0 }).closePath();

        // Create the reel sprite
        this._reel = PIXI.Sprite.from("reel");
        this._reel.label = "Reel";
        this._reel.anchor.set(0.5, 0.5);
        this._reel.position.set(640, 300);
        this.addChild(this._reel);

        // Create a container for symbols in the reel
        this._reelContainer = new PIXI.Container({ label: `ReelContainer` });
        this._reel.addChild(this._reelContainer);
        this._reelContainer.mask = this._mask; // Mask the container to limit symbol visibility

        this._symbols = [];
        // Add symbols to the reel container
        for (let rIndex = 0; rIndex < this._row + this._excess; rIndex++) {
            this._symbols[rIndex] = new Symbol(this._app, (REEL_SET[randomSymbolIndex + rIndex]), rIndex - 1);
            this._symbols[rIndex].position.set(0, this.SYMBOL_START_POINT + (rIndex * (this._symbols[rIndex].height + this.SYMBOL_GAP)));

            this._reelContainer.addChild(this._symbols[rIndex]);
        }

        let frame = PIXI.Sprite.from("frame");
        frame.label = "Frame";
        frame.anchor.set(0.5, 0.5);
        frame.position.set(640, 300);
        this.addChild(frame);
    }

    //#region EVENT LISTENERS
    // Set up event listeners for various events such as reel stopping and data receiving
    private eventListeners() {
        globalThis.eventBus.on(EventNames.SpinSkipped, this.onSpinSkipped.bind(this));
        globalThis.eventBus.on(EventNames.ReelStopped, this.onSpinStopped.bind(this));
        globalThis.eventBus.on(EventNames.DataRecieved, this.onDataReceived.bind(this));
        globalThis.eventBus.on(EventNames.WinShown, this.onWinDisplayOver.bind(this));
    }
    //#endregion

    // Start the spinning of the reels, with a delay to stagger the start
    public startSpin(delay: number = 0) {
        if (this._isSpinning) return; // Prevent starting a new spin if one is already in progress

        this._isSpinning = true;
        this._isDataReceived = false;

        globalThis.eventBus.emit(EventNames.SpinStarted);

        // Simulate backend data response after 3 seconds
        this._timeout = setTimeout(() => {
            globalThis.eventBus.emit(EventNames.DataRecieved, Math.floor(Math.random() * (REEL_SET.length - (this._row + this._excess))));
        }, 3000);

        // Relocate reel by animating its position
        this.relocateReel(this._reelContainer, this.BACK_POINT, this.END_POINT, delay);
    }

    //#region REEL MOVEMENT
    // Animate the reel's movement by relocating it
    private relocateReel(reel: PIXI.Container, backPoint: number, endPoint: number, delay: number) {
        const startPoint: number = reel.position.y;

        let startTween = gsap.to(reel.position, {
            y: backPoint, duration: this.TWEEN_START_DURATION, ease: "none", delay: delay, onComplete: () => {
                let loopTween = gsap.fromTo(reel.position, { y: startPoint }, {
                    y: endPoint, duration: this.TWEEN_LOOP_DURATION, ease: "none", onComplete: () => {
                        if (this._isDataReceived) {
                            this.replaceDataSymbols();

                            reel.position.y = 0;

                            globalThis.eventBus.emit(EventNames.ReelStopped);
                        } else {
                            this.replaceFakeSymbols();
                            loopTween.restart();
                        }
                    }
                });
            }
        });
    }
    //#endregion 

    // Replace the fake symbols during the animation loop with new random symbols
    private replaceFakeSymbols() {
        let previousSymbols = this._symbols.map(element => element.index);

        for (let sIndex = 0; sIndex < this._symbols.length; sIndex++) {
            if (sIndex == 0) {
                const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                this._symbols[0].setIndex(randomSymbol.index);
                continue;
            } else if (sIndex == this._symbols.length - 1) {
                return;
            }

            this._symbols[sIndex].setIndex(previousSymbols[sIndex - 1]);
        }
    }

    // Replace the symbols with data received from the backend
    private replaceDataSymbols() {
        for (let sIndex = 0; sIndex < (this._row + this._excess); sIndex++) {
            this._symbols[sIndex].setIndex((REEL_SET[this._data + sIndex]));
        }
    }

    private onSpinSkipped(){
        clearTimeout(this._timeout);
        globalThis.eventBus.emit(EventNames.DataRecieved, Math.floor(Math.random() * (REEL_SET.length - (this._row + this._excess))));
    }

    // Event handler for when data has been received
    private onDataReceived(data: number) {
        this._data = data;
        this._isDataReceived = true;
    }

    // Event handler for when the spin is stopped
    private onSpinStopped() {
        globalThis.eventBus.emit(EventNames.SpinStopped);
        this._isSpinning = false;

        this.checkWin();
    }

    // Check if there is a win by comparing the current symbols with winning patterns
    private checkWin() {
        let winFound = false;
        let symIndex: number = -1;
        let payoutCount: number = -1;

        for (let index = 0; index < WINNING_REEL_INDICES.length; index++) {
            if (winFound) break;

            if (this._data === WINNING_REEL_INDICES[index].index) {
                symIndex = WINNING_REEL_INDICES[index].symIndex;
                payoutCount = WINNING_REEL_INDICES[index].count;

                setTimeout(() => {
                    for (let sIndex = (this._excess / 2); sIndex < this._symbols.length - (this._excess / 2); sIndex++) {
                        if (this._symbols[sIndex].index == symIndex) {
                            this._symbols[sIndex].setHighlight();
                        } else {
                            this._symbols[sIndex].setBlackout();
                        }
                    }
                }, 100);

                let payout = SYMBOLS[symIndex].payout[payoutCount];
                globalThis.eventBus.emit(EventNames.MoneyEarned, payout);

                winFound = true;
                break;
            }
        }

        if (!winFound) {
            globalThis.eventBus.emit(EventNames.MoneyEarned, -1);
        }
    }

    // Event handler for when the win display animation is over
    private onWinDisplayOver() {
        for (let rIndex = 0; rIndex < this._symbols.length; rIndex++) {
            for (let sIndex = 1; sIndex < this._symbols.length - 1; sIndex++) {
                this._symbols[sIndex].setBase();
                this._symbols[sIndex].setDefault();
            }
        }
    }

    //#region GETS & SETS
    // Getters for various properties
    get reelContainers() {
        return this._reelContainer;
    }
    get symbols() {
        return this._symbols;
    }
    get reels() {
        return this._reel;
    }
    get isSpinning() {
        return this._isSpinning;
    }
    get mask() {
        return this._mask;
    }
    //#endregion
}