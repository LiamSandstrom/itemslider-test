const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");
const slider = document.querySelector("#slider");
const sliderText = document.querySelector("#slider-txt");

let mouseX;
let focused;
let screenWidth;
let wrapperWidth = wrapper.scrollWidth - (parseFloat(getComputedStyle(wrapper).paddingLeft) * 2) - 400;
let sliderValue;
slider.value = 1

slider.addEventListener("input", () => {
    sliderValue = slider.value;
    console.log(sliderValue)
    sliderText.textContent = sliderValue;
})

wrapper.addEventListener("mousedown" , (e) => {
    mouseX = e.clientX;
    screenWidth = window.innerWidth;
    addEventListener("mousemove",mouseMove);
});


function mouseMove(e){
    let x = e.clientX;
    let width = wrapperWidth / screenWidth;
    //2 = 50%, 4 = 25% 
    width *= sliderValue;
    wrapper.scrollLeft -= (x - mouseX) * width;
    mouseX = x;
    focusItem();
}

window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", mouseMove);
})

swapFocused(items[0]);

function focusItem(){
    for(let item of items){
        const left = item.getBoundingClientRect().left;
        const width = item.getBoundingClientRect().width;
        const screenWidth = window.innerWidth / 2;
        const smallest = (left) + width / 2;
        const largest = left + width;
        if(screenWidth > smallest && screenWidth < largest){
            swapFocused(item);
        }
    }
}

function swapFocused(item) {
    if (focused != null) {
        focused.style.transform = "scale(1)";
    }
    
    focused = item;
    focused.style.transform = "scale(1.1)";
};


