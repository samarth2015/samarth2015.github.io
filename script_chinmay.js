function password(keyElement){
    const passkey = document.getElementById('passkey');
    const key_class = keyElement.getAttribute('class');
    if(key_class === 'column back'){
        passkey.innerHTML = passkey.innerHTML.slice(0, -1);

    }
    if(key_class === 'column check'){
        if(passkey.innerHTML === '2005'){
            document.getElementById('passkey-wrapper').style.opacity = 0;
            //uncomment the following code if you need that opening butterfly animation
            // document.getElementById("background-wrapper").style.opacity = 1;
            // //wait for 1 second
            // setTimeout(function(){
            //     document.getElementById("left-half").style.transform = "translateX(-60vw)"
            //     document.getElementById("right-half").style.transform = "translateX(+60vw)"
            // }, 1000);

            // setTimeout(function(){
            //     document.getElementById("mobile-screen").style.display = "none";
            // }, 2000);

            const instaMessage = document.getElementById("insta-messages");
            setTimeout(function(){
                document.getElementById("mobile-screen").style.display = "none";
                instaMessage.style.display = "block";
            }, 1000);
            setTimeout(function(){
                instaMessage.style.opacity = 1;
                startMessaging();
            }, 1500);

        }else{
            passkey.innerHTML = "";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect Passkey",
            });
        }
    }
    if(key_class === 'column'){
        if(passkey.innerHTML.length < 4){
            passkey.innerHTML += keyElement.innerHTML;
        }
    }
    console.log(passkey.innerHTML);
}

function getRandomFlyProperties() {
    return {
        x: `${Math.random() * 40 - 20}vw`, 
        y: `${-Math.random() * 80}vh`,  
        rotate: `${Math.random() * 90}deg` 
    };
}

function createButterfly(container) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.textContent = '❤️';
    butterfly.style.opacity = 1;

    container.appendChild(butterfly);
    return butterfly;
}

function flyButterflies(message) {
    const rightContainer = message.querySelector('.butterfly-container');
    const leftContainer = message.querySelector('.butterfly-container-bottom-left');

    animateButterflies(rightContainer);
    animateButterflies(leftContainer);

    setTimeout(() => {
        regenerateButterflies(rightContainer);
        regenerateButterflies(leftContainer);
    }, 2000); 
}

function animateButterflies(container) {
    if (!container) return;

    const butterflies = container.querySelectorAll('.butterfly');
    butterflies.forEach(butterfly => {
        const { x, y, rotate } = getRandomFlyProperties();
        butterfly.style.setProperty('--fly-x', x);
        butterfly.style.setProperty('--fly-y', y);
        butterfly.style.setProperty('--fly-rotate', rotate);
        butterfly.style.animation = 'flyUp 2s forwards';
    });
}

function regenerateButterflies(container) {
    if (!container) return;

    container.innerHTML = ''; 
    for (let i = 0; i < 3; i++) {
        createButterfly(container);
    }
}

function startMessaging(){
    const texts = document.getElementById('texts');
    const message_area = document.getElementById('message-area');
    const createTextMessage = (text_message) => {
        const textMessage = document.createElement('div');
        textMessage.className = 'text-message entering';
        textMessage.setAttribute('onclick', 'flyButterflies(this)');
    
        const butterflyContainer = document.createElement('div');
        butterflyContainer.className = 'butterfly-container';
        for (let i = 0; i < 3; i++) {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.textContent = '❤️';
            butterflyContainer.appendChild(butterfly);
        }
    
        const butterflyContainerBottomLeft = document.createElement('div');
        butterflyContainerBottomLeft.className = 'butterfly-container-bottom-left';
        for (let i = 0; i < 3; i++) {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.textContent = '❤️';
            butterflyContainerBottomLeft.appendChild(butterfly);
        }
    
        textMessage.appendChild(butterflyContainer);
        textMessage.appendChild(butterflyContainerBottomLeft);
        textMessage.appendChild(document.createTextNode(text_message));
    
        return textMessage;
    };

    const createLoading = () => {
        const loading = document.createElement('div');
        loading.className = 'text-message typing';
        for(let i = 0; i < 3; i++){
            const child = document.createElement('div');
            child.className = 'dot';
            loading.appendChild(child);
        }
        texts.appendChild(loading);
    }
    
    const addNewMessage = (messageText) => {
        const newMessage = createTextMessage(messageText);
        const loading = texts.querySelector('.typing');
        if(loading){
            texts.removeChild(loading);
        }
        texts.appendChild(newMessage);
        message_area.scrollTop = message_area.scrollHeight;

        setTimeout(() => {
            newMessage.classList.remove('entering');
        }, 100); 
    
        setTimeout(() => {
            createLoading();
        }, 1500);
    };

    const messages = [
        {
            message: "Holaa.. Chinmay!!",
            waitTime: 2000,
        },
        {
            message: "Thank you for making this year special!!! Here is something I want to share with you!",
            waitTime: 5000,
        },
        {
            message: "Btw u can make these hearts fly by clicking on messages ❤️",
            waitTime: 12000,
        },
        {
            message: "You r doing great and i am happy to have you as a friend in my life!",
            waitTime: 18000,
        },
        {
            message: "Lets hope the new year will bring joy to our life.. Wish you happy 2025!!.. ",
            waitTime: 25000,
        },
        {
            message: "Meanwhile the year wrapped is ready.. scroll below to check that out!",
            waitTime: 30000,
        },

    ]

    for(let i = 0; i < messages.length; i++){

        setTimeout(() => {
            addNewMessage(messages[i].message);
            if(i == messages.length - 1){
                createSnowflakes();
                setTimeout(() => {
                    const loading = texts.querySelector('.typing');
                    if(loading){
                        texts.removeChild(loading);
                    }
                }, 1500);
            }
        }, messages[i].waitTime);
    }

}


function createSnowflakes() {
    document.getElementById("year-wrapped").style.display = "flex";
    const snowOverlay = document.querySelector('.snow-overlay');

    const SNOWFLAKE_COUNT = 100;
    const SNOWFLAKE_SPEED_MIN = 2;
    const SNOWFLAKE_SPEED_MAX = 5;
    const SNOWFLAKE_SIZE_MIN = 2;
    const SNOWFLAKE_SIZE_MAX = 6;
    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        const size = Math.random() * (SNOWFLAKE_SIZE_MAX - SNOWFLAKE_SIZE_MIN) + SNOWFLAKE_SIZE_MIN;
        const horizontalMovement = (Math.random() - 0.5) * 20; 
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${(Math.random() - 0.5) * 150}vw`;
        snowflake.style.top = `${0}vh`;
        snowflake.style.animationDuration = `${Math.random() * (SNOWFLAKE_SPEED_MAX - SNOWFLAKE_SPEED_MIN) + SNOWFLAKE_SPEED_MIN}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.setProperty('--horizontal-movement', `${horizontalMovement}vw`);

        snowOverlay.appendChild(snowflake);
    }

    updateContent(currentIndex);

}

function moveUp(){
    const tapToReveal = document.getElementById('tap-to-reveal');
    tapToReveal.style.animation = 'moveUp 1s forwards';
    tapToReveal.style.opacity = 0.6;
    tapToReveal.style.color = 'rgba(255, 255, 255, 0.0)';
}

function moveDown(){
    const tapToReveal = document.getElementById('tap-to-reveal');
    tapToReveal.style.animation = 'moveDown 0.5s forwards';
    tapToReveal.style.opacity = 1;
    tapToReveal.style.color = 'rgba(255, 255, 255, 1)';
}

const questions = [
    {
        question: "Ever wonder how many steps we walked together!",
        answer: "Countless!",
        theme: {
            gradient: "linear-gradient(135deg, #1A374D, #406882, #6998AB)", // Frosty Winter Theme
            tapToRevealColor: "#6998AB",
            textColor: "#F0F8FF",
            buttonColor: "#7393B3",
        },
    },
    {
        question: "One word for 2024",
        answer: "Insightful",
        theme: {
            gradient: "linear-gradient(45deg, #FFA17A, #FFD2A5, #FFAA85)", // Sunset Glow Theme
            tapToRevealColor: "#FFAA85",
            textColor: "#FFFFFF",
            buttonColor: "#FFAA85",
        },
    },
    {
        question: "Happiest month award goes to...",
        answer: "September!",
        theme: {
            gradient: "radial-gradient(circle, #2B193D, #522B5B, #8A3D76)", // Mystical Night Theme
            tapToRevealColor: "#8A3D76",
            textColor: "#EEE4FF",
            buttonColor: "#8A3D76",
        },
    },
    {
        question: "Favourite movie watched this year",
        answer: "Kashmir files!",
        theme: {
            gradient: "linear-gradient(to bottom, #013A63, #28577A, #51B2C9)", // Ocean Breeze Theme
            tapToRevealColor: "#51B2C9",
            textColor: "#FFFFFF",
            buttonColor: "#51B2C9",
        },
    },
    {
        question: "Your highest screen time in a day was...",
        answer: "16 hours 🫠",
        theme: {
            gradient: "linear-gradient(135deg, #4B79A1, #283E51)", // Glacier Frost Theme
            tapToRevealColor: "#4B79A1",
            textColor: "#E8F0F2",
            buttonColor: "#6D98BA",
        },
    },
    {
        question: "Most listened song of 2024..",
        answer: "Ve hanniyaan",
        theme: {
            gradient: "linear-gradient(to bottom, #3A1C71, #D76D77, #FFAF7B)", // Twilight Charm Theme
            tapToRevealColor: "#D76D77",
            textColor: "#FFF4E0",
            buttonColor: "#FFAF7B",
        },
    },
    {
        question: "Guess what you saw first time in 2024",
        answer: "Branch Change",
        theme: {
            gradient: "radial-gradient(circle, #1E3C72, #2A5298)", // Arctic Night Theme
            tapToRevealColor: "#2A5298",
            textColor: "#DCEFFF",
            buttonColor: "#4A6BAA",
        },
    },
    {
        question: "Top game enjoyed in 2024...",
        answer: "Chess!",
        theme: {
            gradient: "linear-gradient(45deg, #FF758C, #FF7EB3)", // Warm Festive Glow Theme
            tapToRevealColor: "#FF7EB3",
            textColor: "#FFFFFF",
            buttonColor: "#FF758C",
        },
    },
    {
        question: "Most watched show...",
        answer: "Akash Gupta Standup",
        theme: {
            gradient: "linear-gradient(to right, #000428, #004e92)", // Midnight Voyage Theme
            tapToRevealColor: "#004e92",
            textColor: "#B3DAFF",
            buttonColor: "#007ACC",
        },
    },
    {
        question: "Can you guess the number of smiles we shared?",
        answer: "Infinite ♾️",
        theme: {
            gradient: "radial-gradient(circle, #FF9966, #FF5E62)", // Cozy Campfire Theme
            tapToRevealColor: "#FF5E62",
            textColor: "#FFEBD6",
            buttonColor: "#FF9966",
        },
    },
];

  
let currentIndex = 0;

function updateContent(index) {
    moveDown();
    if(index === questions.length - 1){
        document.getElementById('footer').style.display = "flex";
    }
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");
    const tapToRevealElement = document.getElementById("tap-to-reveal");
    const yearWrapped = document.getElementById("year-wrapped");
    const overlay = document.getElementById("gradient-overlay");
    const leftButton = document.querySelector(".left");
    const rightButton = document.querySelector(".right");

    // Update question and answer text
    questionElement.innerHTML = questions[index].question;
    answerElement.innerHTML = questions[index].answer;

    // Apply the new gradient to the overlay and fade it in
    const theme = questions[index].theme;
    overlay.style.backgroundImage = theme.gradient;
    overlay.style.opacity = 1;

    setTimeout(() => {
        yearWrapped.style.backgroundImage = theme.gradient;
        overlay.style.opacity = 0;
    }, 750); 

    // Update text and button colors
    tapToRevealElement.style.backgroundColor = theme.tapToRevealColor;
    leftButton.style.backgroundColor = theme.buttonColor;
    rightButton.style.backgroundColor = theme.buttonColor;
    yearWrapped.style.color = theme.textColor;
}

function moveLeft() {
    currentIndex = (currentIndex - 1 + questions.length) % questions.length;
    updateContent(currentIndex);
}

function moveRight() {
    currentIndex = (currentIndex + 1) % questions.length;
    updateContent(currentIndex);
}
