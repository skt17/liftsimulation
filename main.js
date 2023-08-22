

let liftFloorMapping = {

}
let availableLifts = [];
let waitingPool = []

// Mind Map
// 4 floors 3 lifts
// lift floor mapping on first everything is in groud floor
// call is coming from 3rd floor 
//     iterate through the lift mapping Object
//     get the lift closer from the floor 
// move the lift to the requested floor



function registerEvent() {

    const upElements = document.querySelectorAll('.up');
    const downElements = document.querySelectorAll('.down');
    upElements.forEach(upElement => {
        upElement.addEventListener('click', () => {


            callLift(upElement)
        })
    })

    downElements.forEach(downElement => {
        downElement.addEventListener('click', () => {
            callLift(downElement)
        })
    })

}

function callLift(element) {
    const floorNo = element.getAttribute('id').split("-")[1]
    const previousUpElementClassName = element.className
    console.log("calling from ", floorNo);
    element.className += " on"
    element.getAttribute('id').disabled = true;
    console.log(element.className)
    let liftToGo = availableLifts["0"]
    if (liftToGo === undefined) {
        waitingPool.push(element)
        console.log("pushing the element to waiting pool")
        return;
    }
    let minimumDistance = Math.abs(floorNo - liftFloorMapping[liftToGo])
    console.log(liftToGo);
    for (const [key, value] of Object.entries(liftFloorMapping)) {
        const distance = Math.abs(floorNo - value);
        console.log("index", availableLifts.indexOf(key))
        console.log("distance");
        if (distance < minimumDistance && availableLifts.indexOf(key) >= 0) {
            liftToGo = key;
            minimumDistance = distance
        }
    }

    console.log("lift to go", liftToGo)
    console.log(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}`);


    // // hide existing the lift object comment
    // document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}`).className = "lift";
    // document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}-left`).className = ""
    // document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}-right`).className = ""
    // add the lift on onGoing pool
    availableLifts.splice(availableLifts.indexOf(liftToGo), 1)

    console.log("available Lifts", availableLifts)

        letsGo(floorNo, liftToGo, element, -71.5)



    // if (floorNo > liftFloorMapping[liftToGo]) {
    //     for (let i = liftFloorMapping[liftToGo]; i <= floorNo; i++) {

    //         letsGo(i, floorNo, liftToGo, element,-70)
    //         // Delay based on floor difference
    //     }
    // }
    // else {
    //     for (let i = liftFloorMapping[liftToGo]; i >= floorNo; i--) {

    //         letsGo(i, floorNo, liftToGo, element,70)
    //         // Delay based on floor difference
    //     }
    // }
}



function letsGo(finalFloor, liftToGo, element, distanceToMove) {
    const elevator = document.getElementById(`lift-${liftToGo}`);

    console.log("elevator", `lift-${liftToGo}`);
    console.log("finalFloor", finalFloor);

    elevator.style.transition = `transform ${Math.abs(finalFloor - liftFloorMapping[liftToGo])}s ease-in-out`; // Adjust timing as needed

    elevator.style.transform = `translateY(${distanceToMove * Math.abs(finalFloor)}px)`;


    console.log(liftFloorMapping);

    setTimeout(() => {
    
        const leftDoor = document.getElementById(`lift-${liftToGo}-left`);
        const rightDoor = document.getElementById(`lift-${liftToGo}-right`);

        liftFloorMapping = { ...liftFloorMapping, [liftToGo]: finalFloor }
        document.getElementById(`lift-${liftToGo}-left`).classList.add("doorOpen");
        document.getElementById(`lift-${liftToGo}-right`).classList.add("doorOpen");

        setTimeout(() => {
            document.getElementById(`lift-${liftToGo}-left`).className = "leftSide";
            document.getElementById(`lift-${liftToGo}-right`).className = "rightSide";
            setTimeout(() => {
                availableLifts.push(liftToGo)
                element.classList.remove("on")
            }, 1000)


        }, 2500);
    }, Math.abs(finalFloor - liftFloorMapping[liftToGo]) * 1000)
}


document.getElementById("entry").addEventListener('click', () => {
    console.log("hello")

    let floorToBecreated = parseInt(document.getElementById("floor-no").value)
    let liftTobecreated = parseInt(document.getElementById("lift-no").value)
    console.log("hi", floorToBecreated * liftTobecreated)
    if (floorToBecreated <= 0 || liftTobecreated <= 0) {
        alert("Enter a valid input")
        return
    }
    document.body.innerHTML = "";

    for (let floor = floorToBecreated - 1; floor >= 0; floor--) {
        // Create lift container
        const liftContainer = document.createElement('div');
        liftContainer.classList.add('lift-container');
        liftContainer.id = 'floor-' + floor;

        // Create switch container
        const switchContainer = document.createElement('div');
        switchContainer.classList.add('switch-container');

        if (floor < floorToBecreated - 1) {
            // Create "up" button
            const upButton = document.createElement('button');
            upButton.classList.add('switch', 'up');
            upButton.id = 'up-' + floor;
            upButton.textContent = 'up';
            switchContainer.appendChild(upButton);

        }
        if (floor > 0) {
            // Create "down" button
            const downButton = document.createElement('button');
            downButton.classList.add('switch', 'down');
            downButton.id = 'down-' + floor;
            downButton.textContent = 'down';
            switchContainer.appendChild(downButton);

        }

        // Append switch container to lift container
        liftContainer.appendChild(switchContainer);

        // Create lift divs

        if (floor === 0) {

            for (let i = 0; i < liftTobecreated; i++) {
                const liftDiv = document.createElement('div');
                liftDiv.classList.add('lift');
                const leftSide = document.createElement('div');
                leftSide.id = `lift-${i}-left`

                const rightSide = document.createElement('div');
                rightSide.id = `lift-${i}-right`
                if (floor == 0) {
                    leftSide.classList.add('leftSide')
                    rightSide.classList.add('rightSide');


                }
                liftDiv.classList.add('active');

                liftDiv.id = `lift-${i}`;
                liftDiv.appendChild(leftSide.cloneNode(true));
                liftDiv.appendChild(rightSide.cloneNode(true))
                // console.log(liftDiv)
                liftContainer.appendChild(liftDiv);
            }
        }
        // Append lift container to the document body
        document.body.appendChild(liftContainer);
    }
    registerEvent()
    doLiftFloorMapping(liftTobecreated);
}

)

function doLiftFloorMapping(liftTobecreated) {
    for (i = 0; i < liftTobecreated; i++) {
        const z = "" + i;
        liftFloorMapping[i] = "0";
        availableLifts.push("" + i)
    }
}
setInterval(
    function checkTheWaitingPool() {
        waitingPool.map((element, index) => {
            callLift(element)
            waitingPool.splice(index, 1)
        })
    }, 200)