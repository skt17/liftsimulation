

let liftFloorMapping = {
    // "0": "0",
    // "1": "0",
    // "2": "0"
    // // "3": "0",

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
    element.className += " on"
    element.getAttribute('id').disabled=true;
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


    // hide existing the lift object 
    document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}`).className = "lift";
    document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}-left`).className = ""
    document.getElementById(`floor-${liftFloorMapping[liftToGo]}-lift-${liftToGo}-right`).className = ""
    // add the lift on onGoing pool
    availableLifts.splice(availableLifts.indexOf(liftToGo), 1)

    console.log("available Lifts", availableLifts)
    // Get the lift object for the requested floor
    // setTimeout(() => {

    //     // document.getElementById(`floor-${floorNo}-lift-${liftToGo}`).className += " active";

    //     document.getElementById(`floor-${floorNo}-lift-${liftToGo}`).classList.toggle("active")
    //     liftFloorMapping = { ...liftFloorMapping, [liftToGo]: floorNo }
    //     console.log(liftFloorMapping);
    //     element.className = previousUpElementClassName;
    //     availableLifts.push(liftToGo)

    // }, 3000);

    if (floorNo > liftFloorMapping[liftToGo]) {
        for (let i = liftFloorMapping[liftToGo]; i <= floorNo; i++) {

            letsGo(i, floorNo, liftToGo, element,-20)
            // Delay based on floor difference
        }
    }
    else {
        for (let i = liftFloorMapping[liftToGo]; i >= floorNo; i--) {

            letsGo(i, floorNo, liftToGo, element,70)
            // Delay based on floor difference
        }
    }
    // checkTheWaitingPool();
}

// function letsGo(floorNoToGo, finalFloor, liftToGo, element) {
//     setTimeout(() => {
//         document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`).classList.add("active");
//         document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).className = "leftSide"
//         document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).className = "rightSide"
//         if (floorNoToGo == finalFloor) {
//             liftFloorMapping = { ...liftFloorMapping, [liftToGo]: finalFloor }
//             console.log(liftFloorMapping);
//             availableLifts.push(liftToGo)
//             element.classList.remove("on");
//             element.getAttribute('id').disabled=false;

//             document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).classList.add("doorOpen")
//             document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).classList.add("doorOpen")

//         }
//         else {
//             setTimeout(() => {
//                 document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`).classList.remove("active");
//                 document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).classList.remove("leftSide")
//                 document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).classList.remove("rightSide")


//             }, 2000);
//         }
//     }, (Math.abs(floorNoToGo - liftFloorMapping[liftToGo])) * 2000);
// }
function letsGo(floorNoToGo, finalFloor, liftToGo, element,distanceToMove) {
    setTimeout(() => {
        document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`).classList.add("active");
        document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).className = "leftSide";
        document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).className = "rightSide";
        const elevator = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`);
        const leftDoor = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`);
        const rightDoor = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`);

        // Calculate the vertical distance to move the elevator
         // Adjust the value according to your layout
         distanceToMove =floorNoToGo === finalFloor?0:distanceToMove
        // Apply the transform property to move the elevator

        if (floorNoToGo == finalFloor) {
            liftFloorMapping = { ...liftFloorMapping, [liftToGo]: finalFloor }
            console.log(liftFloorMapping);
            elevator.style.transform = 'translateY(0)';

            setTimeout(() => {
                document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).classList.add("doorOpen");
                document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).classList.add("doorOpen");
                setTimeout(() => {
                    document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).className = "leftSide";
                    document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).className = "rightSide";
                    availableLifts.push(liftToGo)

                }, 2500);
            }, 3000)


            element.classList.remove("on");

        } else {
            elevator.style.transform = `translateY(${distanceToMove}px)`;

            setTimeout(() => {
                document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`).classList.remove("active");
                elevator.style.transform = 'translateY(0)';

                document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`).classList.remove("leftSide");
                document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`).classList.remove("rightSide");
            }, 2500);
        }
    }, (Math.abs(floorNoToGo - liftFloorMapping[liftToGo])) * 2000);
}
// function letsGo1(floorNoToGo, finalFloor, liftToGo, element) {
//     const elevator = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}`);
//     const leftDoor = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-left`);
//     const rightDoor = document.getElementById(`floor-${floorNoToGo}-lift-${liftToGo}-right`);

//     // Calculate the vertical distance to move the elevator
//     const distanceToMove = 70; // Adjust the value according to your layout

//     // Apply the transform property to move the elevator
//     elevator.style.transform = `translateY(${distanceToMove}px)`;

//     // Open the doors when reaching the final floor
//     if (floorNoToGo === finalFloor) {
//         // Update liftFloorMapping and reset elevator position
//         liftFloorMapping = { ...liftFloorMapping, [liftToGo]: finalFloor };
//         elevator.style.transform = 'translateY(0)';

//         // Add classes for door animations
//         leftDoor.classList.add('doorOpen');
//         rightDoor.classList.add('doorOpen');

//         // Remove the classes after the door animation
//         setTimeout(() => {
//             leftDoor.classList.remove('doorOpen');
//             rightDoor.classList.remove('doorOpen');
//             availableLifts.push(liftToGo);
//         }, 2500);
//     } else {
//         // Remove active class and reset position after animation
//         setTimeout(() => {
//             elevator.classList.remove('active');
//             elevator.style.transform = 'translateY(0)';
//         }, 2500);
//     }
// }


document.getElementById("entry").addEventListener('click', () => {
    console.log("hello")

    let floorToBecreated = parseInt(document.getElementById("floor-no").value)
    let liftTobecreated = parseInt(document.getElementById("lift-no").value)
    console.log("hi",floorToBecreated*liftTobecreated)
    if(floorToBecreated<=0 || liftTobecreated<=0){
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



        for (let i = 0; i < liftTobecreated; i++) {
            const liftDiv = document.createElement('div');
            liftDiv.classList.add('lift');
            const leftSide = document.createElement('div');
            leftSide.id = `floor-${floor}-lift-${i}-left`

            const rightSide = document.createElement('div');
            rightSide.id = `floor-${floor}-lift-${i}-right`
            if (floor == 0) {
                liftDiv.classList.add('active');
                leftSide.classList.add('leftSide')
                rightSide.classList.add('rightSide');


            }
            liftDiv.id = `floor-${floor}-lift-${i}`;
            liftDiv.appendChild(leftSide.cloneNode(true));
            liftDiv.appendChild(rightSide.cloneNode(true))
            // console.log(liftDiv)
            liftContainer.appendChild(liftDiv);
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
},200)