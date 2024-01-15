# Calculator Project

## Overview

This calculator project, as part of The Odin Project curriculum, is designed to provide hands-on experience in developing a functional web-based calculator. It combines HTML, CSS, and JavaScript to create an interactive user interface that performs basic arithmetic operations.

## Features

- **Basic Arithmetic Operations**: Perform addition, subtraction, multiplication, and division.
- **History Display**: Shows the most recent operations and their results.
- **Responsive Design**: Usable across various devices and screen sizes.
- **User-Friendly Interface**: Intuitive design for easy operation.
- **Keyboard Support**: Interact with the calculator using both the mouse and keyboard for a seamless experience.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

## How to Use

- Enter numbers and operations using the mouse or keyboard.
- Click or press the corresponding keys for numbers and basic operations (+, -, *, /).
- View the result by clicking the equals button or pressing 'Enter'.
- The history section displays your most recent calculation.
- Use the clear button or press 'C' to reset the calculator and start a new calculation.

## Challenges

The initial attempt was to replicate the functionality of the Windows Calculator application but it was pretty difficult.
Lots of edge cases that need to be handled and the official calculator also keeps track of memory/past state. In the end
I had to simplify it a bit for my own sanity. THe most difficult part was getting chaining to work alongside the windows
implementation of choosing an operator where you can cycle between different operators as long as you don't start entering
the second operand that comes after the operator. Allowing the user to do this means that you can't use the second operand
default displayed after an intermediate calculation, but I just needed to add a second condition for the operator case
where it disallows evaulation so that you can cycle between operators but when using equals it does evaluate given the
displayed number as the second operand without needing to type in anything as a default.
