[![Build Status](https://travis-ci.org/frankieyan/custom-meta-input.svg?branch=master)](https://travis-ci.org/frankieyan/custom-meta-input)

# Custom Meta Input Component
Not the most creative name around, but this is a component largely inspired by Zapier's input component when editing a Zap, which allows you to create templates to be populated with data from different integrations you've connected to.

![screenshot](docs/screenshot.png)

To checkout the component, go to https://frankieyan.github.io/custom-meta-input, or clone the repo and spin up Storybook by running `yarn storybook`.

### What can be improved?
* **Movable text cursor** - the current version only supports inserting and deleting text/meta data from the end of the string.
* **Selection** - Zapier's component allows you to select the contents of the input element, including the meta data badges, enabling you to copy and paste them around. I haven't thought of how to do this yet =)
* **Customizable data interface** - Currently, the `type` and `value` properties are expected. The interpolation string formats should also be customizable.
* **More tests** - Right now there is only coverage for text/meta interpolation strings manipulation, and not the UI components themselves.
