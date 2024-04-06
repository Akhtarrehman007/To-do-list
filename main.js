#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.redBright("Task Management App"));
let todos_list = [];
let condition = true;
async function main() {
    while (condition) {
        const user_choice = await inquirer.prompt({
            name: "asking_users_choice",
            type: "list",
            message: chalk.yellowBright("What do you want to do?"),
            choices: [
                "To Add Task",
                "To View Task",
                "To Update Task",
                "To Delete Task",
            ],
        });
        if (user_choice.asking_users_choice === "To Add Task") {
            const user_add = await inquirer.prompt({
                name: "ask_to_add",
                type: "input",
                message: chalk.green("What Do You Want TO Add in Checklist?"),
                validate: (value) => {
                    if (value.trim() === "") {
                        return "Please enter a valid task."; // Prompt user if the input is empty
                    }
                    return true;
                },
            });
            if (user_add.ask_to_add.trim() !== "") {
                todos_list.push(user_add.ask_to_add);
                console.log(chalk.blueBright("Task added successfully."));
            }
            else {
                console.log(chalk.red("Invalid input. Task not added."));
            }
        }
        if (user_choice.asking_users_choice === "To View Task") {
            console.log(chalk.greenBright.bgGrey("Your Added Tasks Are:-"));
            console.log(chalk.blueBright(todos_list));
        }
        if (user_choice.asking_users_choice === "To Update Task") {
            const user_update_items = await inquirer.prompt({
                name: "updateItem",
                type: "list",
                message: chalk.red("What Task Do You Want To Update?"),
                choices: todos_list,
            });
            const user_updated_Value = await inquirer.prompt({
                type: "input",
                name: "updatedValue",
                message: chalk.yellowBright(`Enter the updated value for '${user_update_items.updateItem}':`),
            });
            const index = todos_list.indexOf(user_update_items.updateItem);
            if (index !== -1) {
                todos_list[index] = user_updated_Value.updatedValue;
                console.log(chalk.green("Todo item updated successfully."));
                console.log(chalk.red(todos_list));
            }
            else {
                console.log(chalk.red("Item not found in the list."));
            }
        }
        if (user_choice.asking_users_choice === "To Delete Task") {
            const user_delete = await inquirer.prompt({
                type: "list",
                name: "index",
                message: chalk.green("Select the item you want to delete:"),
                choices: todos_list,
            });
            const indexToRemove = todos_list.indexOf(user_delete.index);
            if (indexToRemove !== -1) {
                todos_list.splice(indexToRemove, 1);
                console.log(chalk.blue(`${user_delete.index} has been deleted.`));
            }
            else {
                console.log(chalk.red("Invalid selection."));
            }
            console.log(chalk.green("Updated To Do List:", todos_list));
        }
        const exit = await inquirer.prompt({
            name: "confirmationMessage",
            type: "confirm",
            message: chalk.yellow("Do You Want To Continue Task Management App?"),
            default: true,
        });
        condition = exit.confirmationMessage;
    }
    console.log(chalk.blue("Your checklist As:", todos_list));
}
main();
