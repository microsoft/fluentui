import { STORY_RENDERED } from "@storybook/core-events";
import addons from "@storybook/addons";
import TextFieldTemplate from "./fixtures/text-field.html";
import "./index";

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
    if (name.toLowerCase().startsWith("text-field")) {
        document.querySelectorAll(".form").forEach((el: HTMLFormElement) => {
            el.onsubmit = event => {
                console.log(event, "event");
                event.preventDefault();
                const form: HTMLFormElement = document.forms["myForm"];

                console.log(form.elements["fname"].value, "value of input");
            };
        });
    }
});

export default {
    title: "Text Field",
};

export const TextField = () => TextFieldTemplate;
