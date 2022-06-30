export default {
    created(el, binding) {
        let color = binding.value === undefined ? "#fff" : binding.value;

        el.style.position = "relative";
        el.style.overflow = "hidden";

        el.onclick = function (event) {
            let circle = document.createElement("div");
            let offset = this.getBoundingClientRect();
            let x = event.pageX - offset.left - document.body.scrollLeft;
            let y = event.pageY - offset.top - document.body.scrollTop;

            circle.setAttribute("style", "background: " + color + "; width: 10px; height: 10px; opacity: 0; border-radius: 100em; position: absolute; top: " + y + "px; left: " + x + "px; animation: ripple 0.7s 1 ease-in-out;");
            this.append(circle);
            event.stopPropagation();

            setTimeout(() => circle.parentNode.removeChild(circle), 400);
        };
    },
};
