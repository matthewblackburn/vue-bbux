export function validate(model, options) {
    let message = "";

    if (!options) return message;

    const { type, value, character, number } = options;

    switch (type) {
        case "text":
        case "search":
        case "password":
            if (character) {
                let { min, max, text } = character;

                if (min == 1 && !model.length) {
                    message = text || characterRequired(null, true);
                }

                if (min > 1) {
                    if (isArray(model)) {
                        model.forEach((item) => {
                            if (item.length < min) {
                                message = text || characterRequired(min, true);
                            }
                        });
                    } else {
                        if (model.length < min) {
                            message = text || characterRequired(min, true);
                        }
                    }
                }

                if (max > 1) {
                    if (isArray(model)) {
                        model.forEach((item) => {
                            if (item.length > max) {
                                message = text || characterRequired(max, false);
                            }
                        });
                    } else {
                        if (model.length > max) {
                            message = text || characterRequired(max, false);
                        }
                    }
                }
            }

            if (value) {
                let { min, max, text } = value;

                if (min == 1 && !model.length) {
                    message = text || valueRequired(null, true);
                }

                // Must be an array
                if (min > 1 && model.length < min) {
                    if (isArray(model)) {
                        message = text || valueRequired(min, true);
                    } else {
                        message = "modelValue must be an array";
                    }
                }

                // Must be an array
                if (max > 1 && model.length > max) {
                    console.log("here");
                    if (isArray(model)) {
                        message = text || valueRequired(max, false);
                    } else {
                        message = "modelValue must be an array";
                    }
                } else if (max > 1 && model.length < max) {
                    if (!isArray(model)) {
                        message = "modelValue must be an array";
                    }
                }
            }

            break;

        case "number":
            if (number) {
                let { min, max, text } = number;

                if (min == 1 && model < min) {
                    message = text || numberRequired(null, true);
                }

                if (min > 1) {
                    if (isArray(model)) {
                        model.forEach((item) => {
                            if (item < min) {
                                message = text || numberRequired(min, true);
                            }
                        });
                    } else {
                        if (model < min) {
                            message = text || numberRequired(min, true);
                        }
                    }
                }

                if (max > 1) {
                    if (isArray(model)) {
                        model.forEach((item) => {
                            if (item > max) {
                                message = text || numberRequired(max, false);
                            }
                        });
                    } else {
                        if (model > max) {
                            message = text || numberRequired(max, false);
                        }
                    }
                }
            }

            if (value) {
                let { min, max, text } = value;

                if (min == 1 && !model) {
                    message = text || valueRequired(null, true);
                }

                // Must be an array
                if (min > 1 && model.length < min) {
                    if (isArray(model)) {
                        message = text || valueRequired(min, true);
                    } else {
                        message = "modelValue must be an array";
                    }
                }

                // Must be an array
                if (max > 1 && model.length > max) {
                    if (isArray(model)) {
                        message = text || valueRequired(max, false);
                    } else {
                        message = "modelValue must be an array";
                    }
                } else if (max > 1 && model.length < max) {
                    if (!isArray(model)) {
                        message = "modelValue must be an array";
                    }
                }
            }

            break;
    }

    return message;
}

//////////////////////////////////////////////////

function valueRequired(value, minimum) {
    if (minimum) {
        if (!value) return "This field is required";
        return `At least ${plural(value, "value", true)} required`;
    }

    return `A maximum of ${plural(value, "value", false)} required`;
}

function characterRequired(value, minimum) {
    if (minimum) {
        if (!value) return "This field is required";
        return `At least ${plural(value, "character", true)} required`;
    }

    return `A maximum of ${plural(value, "character", false)} required`;
}

function numberRequired(value, minimum) {
    if (minimum) {
        if (!value) return "This field is required";
        return `The minimum number is ${value}`;
    }

    return `The maximum number is ${value}`;
}

function plural(value, type, minimum) {
    if (minimum) {
        if (value > 1) return `${value} ${type}s are`;
        return `${value} ${type} is`;
    }

    if (value > 1) return `${value} ${type}s are`;
    return `${value} ${type} is`;
}

//////////////////////////////////////////////////

export function isArray(value) {
    return Array.isArray(value);
}

export function isObject(value) {
    return typeof value === "object" && value !== null;
}

export function isFunction(value) {
    return typeof value === "function" && value !== null;
}

export function isString(value) {
    return typeof value === "string" && value !== null;
}

export function isNumber(value) {
    return typeof value === "number" && value !== null;
}

export function isBoolean(value) {
    return typeof value === "boolean" && value !== null;
}
