console.log("pipe.js loaded");

class Pipe {

    constructor(canvasWidth, canvasHeight, gap) {

        this.x = canvasWidth;
        this.width = 80;
        this.speed = 3.5;

        // gap is passed in from game.js so it can scale with screen height.
        // Falls back to 180 if called without the argument.
        this.gap = gap || 180;

        // topHeight must leave room for the gap + some pipe below.
        // Playable height = canvasHeight - 70 (ground).
        // Min top = 8% of playable, max top = playable - gap - 8% of playable.
        let playable = canvasHeight - 70;
        let minTop   = Math.floor(playable * 0.08);
        let maxTop   = Math.floor(playable - this.gap - playable * 0.08);
        this.topHeight = Math.floor(Math.random() * (maxTop - minTop)) + minTop;

        this.canvasHeight = canvasHeight;

        this.scored = false;

    }

    update() {

        this.x -= this.speed;

    }

    draw(ctx) {

        // ---- Pipe body gradient ----
        let gradient = ctx.createLinearGradient(
            this.x,
            0,
            this.x + this.width,
            0
        );

        gradient.addColorStop(0, "#145A32");
        gradient.addColorStop(0.5, "#2ECC71");
        gradient.addColorStop(1, "#145A32");

        ctx.fillStyle = gradient;

        // Top pipe body
        ctx.fillRect(
            this.x,
            0,
            this.width,
            this.topHeight
        );

        // Bottom pipe body
        ctx.fillRect(
            this.x,
            this.topHeight + this.gap,
            this.width,
            this.canvasHeight - this.topHeight - this.gap
        );

        // ---- Pipe highlight (left edge bright strip) ----
        ctx.fillStyle = "rgba(255,255,255,0.15)";

        ctx.fillRect(
            this.x + 6,
            0,
            10,
            this.topHeight
        );

        ctx.fillRect(
            this.x + 6,
            this.topHeight + this.gap,
            10,
            this.canvasHeight - this.topHeight - this.gap
        );

        // ---- Caps ----
        ctx.fillStyle = "#27AE60";

        // Top cap
        ctx.fillRect(
            this.x - 5,
            this.topHeight - 15,
            this.width + 10,
            15
        );

        // Bottom cap
        ctx.fillRect(
            this.x - 5,
            this.topHeight + this.gap,
            this.width + 10,
            15
        );

        // ---- Cap highlights ----
        ctx.fillStyle = "rgba(255,255,255,0.2)";

        ctx.fillRect(
            this.x - 5,
            this.topHeight - 15,
            this.width + 10,
            5
        );

        ctx.fillRect(
            this.x - 5,
            this.topHeight + this.gap,
            this.width + 10,
            5
        );

    }

}