#!/bin/bash

# Set the terminal to cbreak mode
stty cbreak

echo "Please enter a number between 0 and 9"

# Read a single character without waiting for Enter
read -n 1 input
echo -n -e "\n"

for ((num = 0; num < input; num++)); do
    echo -n -e "\a"
    # Add a delay to allow beep to complete
    sleep 1
done

# Restore the original terminal settings
stty sane