var character = document.querySelector(".character");
        var map = document.querySelector(".map");

        var x = 90;
        var y = 34;
        var heldDirections = [];
        var speed = 1;

        const placeCharacters = () => {
            var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

            const heldDirection = heldDirections[0];

            if (heldDirection) {
                if (heldDirection === directions.right) {
                    x += speed;
                }

                if (heldDirection === directions.left) {
                    x -= speed;
                }

                if (heldDirection === directions.down) {
                    y += speed;
                }

                if (heldDirection === directions.up) {
                    y -= speed;
                }
                character.setAttribute("facing", heldDirection);
            }
            character.setAttribute("walking", heldDirection ? "true" : "false");

            var leftLimit = -8;
            var rightLimit = (16 * 11) + 8;
            var topLimit = -8 + 32;
            var bottomLimit = (7 * 16);

            if (x < leftLimit) {
                x = leftLimit;
            }

            if (x > rightLimit) {
                x = rightLimit;
            }

            if (y < topLimit) {
                y = topLimit;
            }

            if (y > bottomLimit) {
                y = bottomLimit;
            }

            var cameraLeft = pixelSize * 66;
            var cameraTop = pixelSize * 42;

            map.style.transform = `translate3d( ${-x * pixelSize + cameraLeft}px, ${-y * pixelSize + cameraTop}px, 0 )`;
            character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
        }

        const step = () => {
            placeCharacters();
            window.requestAnimationFrame(() => {
                step();
            })
        }
        step();

        const directions = {
            up: "up",
            down: "down",
            left: "left",
            right: "right",
        }

        const keys = {
            38: directions.up,
            37: directions.left,
            39: directions.right,
            40: directions.down,
        }

        document.addEventListener("keydown", (e) => {
            var dir = keys[e.which];
            if (dir && heldDirections.indexOf(dir) === -1) {
                heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup", (e) => {
            var dir = keys[e.which];
            var index = heldDirections.indexOf(dir);
            if (index > -1) {
                heldDirections.splice(index,1);
            }
        });


        var isPressed = false;
        const removePressedAll = () => {
            document.querySelectorAll(".dpad-button").forEach(d => {
                d.classList.remove("pressed");
            });
        };

        document.body.addEventListener("mousedown", () => {
            console.log('mouse is down');
            isPressed = true;
        });

        document.body.addEventListener("mouseup", () => {
            console.log('mouse is up');
            isPressed = false;
            heldDirections = [];
            removePressedAll();
        });

        const handleDpadPressed = (direction, click) => {
            if (click) {
                isPressed = true;
            }
            heldDirections = (isPressed) ? [direction] : [];

            if (isPressed) {
                removePressedAll();
                document.querySelector(".dpad-"+direction).classList.add("pressed");
            }
        }

        document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
        document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
        document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
        document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

        document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
        document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
        document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
        document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

        document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
        document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
        document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
        document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));