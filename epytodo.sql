CREATE DATABASE `epytodo`;

USE `epytodo`;

CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(255) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `created_at` datetime DEFAULT NOW() NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `todo` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `created_at` datetime DEFAULT NOW() NOT NULL,
    `due_time` datetime NOT NULL,
    `status` ENUM('not started', 'todo', 'in progress', 'done') DEFAULT 'not started' NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB;
