window.onload = function() {
    
};

window.addEventListener('scroll', function() {
    left = document.getElementById('left-heading');
    // right = document.getElementById('right-heading');
    if (window.scrollY > (window.innerHeight)*2.3) {
        left.style.color = "#eeeeee";
        left.style.transition = 'all 1s';
    }
    else if (window.scrollY > (window.innerHeight)*1.4) {
        left.style.color = "#233145";
        left.style.transition = 'all 1s';
    }
    else if (window.scrollY > (window.innerHeight)*0.6) {
        left.innerHTML = '<span>About Me</span>';
        // right.style.opacity = 0;
        left.style.opacity = 1;
        left.style.color = "#eeeeee";
        left.style.transition = "all 1s";
    }
    else {
        left.style.opacity = 0;
    }
});

function openMobileMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    var children = document.getElementsByClassName("mobile-menu-button")[0].children;
    if (menu.style.left == '0px') {
        menu.style.left = '100vw';
        menu.style.transition = 'left 0.5s';
        children[0].style.transform = 'rotate(0deg)';
        children[0].style.marginTop = '0';
        children[1].style.opacity = '1';
        children[1].style.left = '80vw';
        children[2].style.transform = 'rotate(0deg)';
        children[2].style.marginTop = '4vh';
    } else {
        menu.style.left = '0';
        menu.style.transition = 'left 0.5s';
        children[0].style.transform = 'rotate(45deg)';
        children[0].style.marginTop = '2.5vh';
        children[1].style.opacity = '0';
        children[1].style.left = '100vw';
        // children[1].style.transition = 'opacity 0.5s';
        children[2].style.transform = 'rotate(-45deg)';
        children[2].style.marginTop = '2.5vh';
    }
};

